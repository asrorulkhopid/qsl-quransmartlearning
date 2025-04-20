import { axiosInstance } from "./axiosInstance";

const fetchListSurah = async () => {
  const response = await axiosInstance.get("/surat");
  return response.data;
};

const fetchSurah = async (id) => {
  const response = await axiosInstance.get(`/surat/${id}`);
  return response.data;
};

export { fetchListSurah, fetchSurah };
