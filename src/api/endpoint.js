import { axiosInstance } from "./axiosInstance";

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
  return response.data.data.ayat[ayah - 1];
};

export { fetchListSurah, fetchSurah };
