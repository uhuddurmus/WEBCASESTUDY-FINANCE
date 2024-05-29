import axios from "axios";
import { BACKEND_BASE_URL } from "./contants";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const localitem = localStorage.getItem("userInfo") as string
    const token = JSON.parse(localitem).resData.data;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export default axiosInstance;
