import axios from "axios";
import { UserLogin, UserRegister } from "./userHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";

export const login = (data: UserLogin) => {
  return axios.post("login", data);
};
export const register = (data: UserRegister) => {
  return axios.post("register", data);
};
