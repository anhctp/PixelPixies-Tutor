import axios from "axios";
import { EvaluationCreateFile, EvaluationCreateText } from "./evaluationHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const fileEvaluation = (payload: EvaluationCreateFile) => {
  return axios.post(`/marking/upload-file`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const textEvaluation = (payload: EvaluationCreateText) => {
  return axios.post("/marking/upload-context", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
