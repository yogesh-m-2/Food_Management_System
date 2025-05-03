import axios from "axios";
import config from "../config";

const API_BASE_URL = config.BASE_URL; // Your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Optional: Handle 401 errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("jwtToken"); // Clear token if expired
      window.location.href = "/admin"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
