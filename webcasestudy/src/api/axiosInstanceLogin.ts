import axios from "axios";
import { BACKEND_BASE_URL } from "./contants";


export const axiosInstanceLogin = axios.create({
  baseURL: BACKEND_BASE_URL,
});
export default axiosInstanceLogin;
