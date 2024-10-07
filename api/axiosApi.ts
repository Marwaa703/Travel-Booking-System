// import { API_URL } from "@env";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.7:3002",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
export const handleError = (
  error: any,
  defaultMessage: string,
): string | undefined => {
  if (error.response) {
    const errorMessage =
      error.response.data?.message ||
      error.response.statusText ||
      defaultMessage;
    console.error(`${defaultMessage} with server response:`, errorMessage);
    throw new Error(errorMessage);
  } else {
    console.error(`${defaultMessage} with error:`, error.message);
    throw new Error(error.message || defaultMessage);
  }
};
