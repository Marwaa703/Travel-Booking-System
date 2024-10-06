// axiosConfig.ts
import axios, { AxiosInstance } from "axios";
// env not working
const API_URL = process.env.EXPO_PUBLIC_API;

// Create an instance of Axios
const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.7:3002", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

// Optional: Add request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // You can add token or other modifications here
//     const token = localStorage.getItem("token"); // Example token retrieval
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// Optional: Add response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle errors globally (e.g., logging, redirecting)
//     return Promise.reject(error);
//   },
// );

// Export the configured Axios instance
export default api;
