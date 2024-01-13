import axios from "axios";
import { GenQuest } from "./learningHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const uploadFilePdf = (file: File) => {
  return axios.post(
    "/PDF/upload",
    { pdf: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const genQuest = (payload: GenQuest) => {
  return axios.post("PDF/pdf_to_text/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
