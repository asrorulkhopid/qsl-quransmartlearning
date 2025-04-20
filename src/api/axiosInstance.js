import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://equran.id/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
