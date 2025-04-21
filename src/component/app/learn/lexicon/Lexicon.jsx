import React from "react";
import Label from "../../../label/Label";
import Vocabulary from "../../../vocabulary/Vocabulary";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAyah } from "../../../../api/endPoint";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Lexicon = () => {
  const { ayah, surah } = useParams();
  const fetchVocabularies = async (surah, ayah) => {
    const { data, error } = await supabase
      .from("ayah_dictionary")
      .select("dictionaries")
      .eq("surah", surah)
      .eq("ayah", ayah);
    if (error) throw error;

    const dictionaryIds = data[0]?.dictionaries;

    if (dictionaryIds && dictionaryIds.length > 0) {
      const { data: dictionaries, error: dictError } = await supabase
        .from("dictionary")
        .select("*")
        .in("id", dictionaryIds);

      if (dictError) throw dictError;

      // Sort results according to dictionaryIds order, allowing duplicates
      const orderedDictionaries = dictionaryIds.flatMap((id, index) =>
        dictionaries
          .filter((dict) => dict.id === id)
          .map((dict, subIndex) => ({
            ...dict,
            id: `${dict.id}-${index}-${subIndex}`, // Generate a unique ID
          }))
      );
      console.log(orderedDictionaries);

      return orderedDictionaries;
    }
  };

  const {
    isLoading: loadingVocabularies,
    data: vocabularies,
    isError: errorVocabulary,
  } = useQuery({
    queryFn: () => fetchVocabularies(surah, ayah),
    queryKey: [`vocab-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: ayahData } = useQuery({
    queryFn: () => fetchAyah(surah, ayah),
    queryKey: [`ayah-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (loadingVocabularies) return <p className="text-black">Loading...</p>;
  if (errorVocabulary) return <p>Error - {errorVocabulary}</p>;

  return (
    <div>
      <div className="flex flex-col px-4 md:px-16">
        <div className="self-center mt-2">
          <Label title={`Lexicon [ ${surah}:${ayah} ]`} />
        </div>
        <div className="mt-4">
          <div>
            <p
              style={{ direction: "rtl" }}
              className="font-serif text-xl font-serif">
              {ayahData.teksArab}
            </p>
            <hr className="mt-2 text-indigo-400" />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-600">Terdiri dari X kata :</p>
            <div className="mt-2 flex flex-row-reverse flex-wrap gap-1">
              {vocabularies?.map((vocab) => (
                <Vocabulary arabic={vocab.arab} indonesia={vocab.indonesia} />
              ))}
            </div>
            <hr className="mt-2 text-indigo-400" />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-600">Terjemah indah : </p>
            <p className="text-right mt-2">{ayahData.teksIndonesia}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexicon;
