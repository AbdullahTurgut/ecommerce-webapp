import axios from "axios";
import { logoutUser } from "./authService";

//const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const privateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token");
    return response.data.accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("authToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
