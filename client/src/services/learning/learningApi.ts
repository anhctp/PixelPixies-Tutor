import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const uploadFilePdf = (file: File) => {
  return axios.post("/PDF/upload", file, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
