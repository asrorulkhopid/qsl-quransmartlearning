import { createClient } from "@supabase/supabase-js";
import { axiosInstance } from "./axiosInstance";
import { v4 as uuid } from "uuid";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fetchListSurah = async () => {
  const response = await axiosInstance.get("/surat");
  return response.data;
};

const fetchSurah = async (id) => {
  const response = await axiosInstance.get(`/surat/${id}`);
  return response.data;
};

export const fetchAyah = async (surah, ayah) => {
  const response = await axiosInstance.get(`/surat/${surah}`);
  const allAyah = response.data.data.ayat;
  return {
    ayah: allAyah[ayah - 1],
    isLastAyah: response.data.data.jumlahAyat == allAyah[ayah - 1].nomorAyat,
  };
};

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

    const orderedDictionaries = dictionaryIds.map((id) =>
      dictionaries.find((dict) => dict.id === id)
    );
    return orderedDictionaries;
  }
};

const fetchLexiconExamData = async (surah, ayah) => {
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

    const includedVocabularies = dictionaryIds.map((id) =>
      dictionaries.find((dict) => dict.id === id)
    );

    const excludedVocabularies = [];

    for (let i = 0; i < includedVocabularies.length - 1; i++) {
      excludedVocabularies.push({
        id: uuid(),
        arab: `${includedVocabularies[i].arab} ${
          includedVocabularies[i + 1].arab
        }`,
        isIncluded: false,
      });
    }

    const allVocobularies = [
      ...includedVocabularies.map((vocab) => ({
        ...vocab,
        id: uuid(),
        isIncluded: true,
      })),
      ...excludedVocabularies,
    ];

    for (let i = allVocobularies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allVocobularies[i], allVocobularies[j]] = [
        allVocobularies[j],
        allVocobularies[i],
      ];
    }
    return allVocobularies;
  }
};

export { fetchListSurah, fetchSurah, fetchVocabularies, fetchLexiconExamData };
