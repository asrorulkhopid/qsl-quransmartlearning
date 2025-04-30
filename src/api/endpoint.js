import { supabase } from "../lib/supabase";
import { axiosInstance } from "./axiosInstance";
import { v4 as uuid } from "uuid";

const fetchListSurah = async () => {
  const response = await axiosInstance.get("/surat");
  return response.data;
};

const fetchSurah = async (id) => {
  const response = await axiosInstance.get(`/surat/${id}`);
  return response.data;
};

export const fetchAyah = async (queryKey) => {
  const [_key, surah, ayah] = queryKey;
  const response = await axiosInstance.get(`/surat/${surah}`);
  const allAyah = response.data.data.ayat;
  console.log(`fetching ${surah}-${ayah}`);
  return {
    ayah: allAyah[ayah - 1],
    isLastAyah: response.data.data.jumlahAyat == allAyah[ayah - 1].nomorAyat,
  };
};

const fetchVocabularies = async (queryKey) => {
  const [_key, surah, ayah] = queryKey;
  const { data, error } = await supabase()
    .from("ayah_dictionary")
    .select("dictionaries")
    .eq("surah", surah)
    .eq("ayah", ayah);
  if (error) throw error;

  const dictionaryIds = data[0]?.dictionaries;

  if (dictionaryIds && dictionaryIds.length > 0) {
    const { data: dictionaries, error: dictError } = await supabase()
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
  const { data, error } = await supabase()
    .from("ayah_dictionary")
    .select("dictionaries")
    .eq("surah", surah)
    .eq("ayah", ayah);
  if (error) throw error;

  const dictionaryIds = data[0]?.dictionaries;

  if (dictionaryIds && dictionaryIds.length > 0) {
    const { data: dictionaries, error: dictError } = await supabase()
      .from("dictionary")
      .select("id, arab, indonesia")
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

const fetchMorphologi = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const { data, error } = await supabase()
    .from("morphologi")
    .select()
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const fetchMorphologiExam = async ({ queryKey }) => {
  const [_key, id] = queryKey;

  let isCorrectData = false;
  let examData = null;

  const { data, error } = await supabase()
    .from("morphologi")
    .select()
    .eq("id", id)
    .single();

  if (error) throw error;

  console.log("data", data);

  examData = { morph: data };

  while (!isCorrectData) {
    const { data, error } = await supabase()
      .from("random_ayah")
      .select()
      .limit(1)
      .single();

    if (error) throw error;

    const { data: dictionaries, error: dictError } = await supabase()
      .from("dictionary")
      .select()
      .in("id", data.dictionaries);

    if (dictError) throw error;

    const orderedDictionaries = data.dictionaries.map((id) =>
      dictionaries.find((dict) => dict.id === id)
    );

    const isExist = dictionaries.some((dict) => dict.morf_4 != null);

    if (isExist) {
      let isError = true;

      while (isError) {
        try {
          const ayah = await fetchAyah(data.surah, data.ayah);
          examData = {
            ...examData,
            ayah: ayah.ayah,
            dictionaries: orderedDictionaries,
          };
          isError = false;
        } catch (error) {
          console.log(error);
        }
      }
      isCorrectData = true;
    }
  }

  return examData;
};

export {
  fetchListSurah,
  fetchSurah,
  fetchVocabularies,
  fetchLexiconExamData,
  fetchMorphologiExam,
  fetchMorphologi,
};
