// import { API_URL } from "@env";
import axios, { AxiosInstance } from "axios";
import { store } from "../redux/store";
import { RootState } from "../redux/store";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.4:3002",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
