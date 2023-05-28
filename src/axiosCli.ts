import axios from "axios";
import { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://blog.kata.academy/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
