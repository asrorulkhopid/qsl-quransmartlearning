import React from "react";
import Label from "../../../component/label/Label";
import Vocabulary from "../../../component/vocabulary/Vocabulary";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAyah, fetchVocabularies } from "../../../api/endpoint";
import Loading from "../../../component/loading/Loading";
import Error from "../../../component/error/Error";
import Divider from "../../../component/divider/Divider";
const Lexicon = () => {
  const { ayah, surah } = useParams();
  const navigate = useNavigate();

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

  if (loadingVocabularies) return <Loading />;
  if (errorVocabulary)
    return (
      <Error
        message={"Something when wrong, please try again"}
        onReload={() => location.reload()}
      />
    );

  return (
    <div>
      <div className="flex flex-col px-4 md:px-16 text-on-secondary">
        <div className="self-center mt-2">
          <Label title={`Lexicon [ ${surah}:${ayah} ]`} />
        </div>
        <div className="mt-4">
          <div>
            <p
              style={{ direction: "rtl" }}
              className="text-xl font-scheherazade">
              {ayahData?.ayah.teksArab}
            </p>
            <Divider />
          </div>
          <div className="mt-2">
            <p className="font-semibold ">
              Terdiri dari {ayahData?.length} kata :
            </p>
            <div className="mt-2 flex flex-row-reverse flex-wrap gap-1">
              {vocabularies?.map((vocab, i) => (
                <Vocabulary
                  key={i}
                  arabic={vocab.arab}
                  indonesia={vocab.indonesia}
                />
              ))}
            </div>
            <Divider />
          </div>
          <div className="mt-2">
            <p className="font-semibold">Terjemah indah : </p>
            <p className="text-right mt-2 italic">
              {ayahData?.ayah.teksIndonesia}
            </p>
            <Divider />
          </div>
          <div className="text-right mt-8">
            <button
              onClick={() => navigate("exam")}
              className="bg-accent px-4 py-2 text-surface rounded-md shadow-xs hover:shadow-md hover:font-semibold shadow-accent cursor-pointer">
              Mark as Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexicon;
