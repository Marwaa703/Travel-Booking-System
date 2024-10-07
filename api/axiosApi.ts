import { API_URL } from "@env";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
