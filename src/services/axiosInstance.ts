import axios from "axios";
import { authService } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu backend dùng cookie cho refresh token
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(
      "[AXIOS INTERCEPTOR] originalRequest.url:",
      originalRequest.url
    );
    // Danh sách các endpoint không cần xác thực
    const excludedEndpoints = [
      "auth/login",
      "auth/register",
      "auth/google-login",
      "auth/forgot-password",
      "auth/reset-password",
    ];
    // Nếu request là tới các endpoint này thì không refreshToken, không logout
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !excludedEndpoints.some((endpoint) =>
        originalRequest.url?.endsWith(endpoint)
      )
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const accessToken = await authService.refreshToken();
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer " + accessToken;
        processQueue(null, accessToken);
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        window.location.reload();
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await authService.logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
