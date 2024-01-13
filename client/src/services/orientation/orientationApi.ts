import axios from "axios";
import { roadmapCreate } from "./orientationHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const createRoadmap = (payload: roadmapCreate) => {
  return axios.post("/Roadmap/create", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
