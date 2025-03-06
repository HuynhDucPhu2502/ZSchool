import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | Error) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | Error | null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(null);
  });

  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  timeout: 1000 * 60 * 10,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
api.interceptors.response.use(
  // Thành công
  (response) => {
    return response;
  },

  // Thất bại
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await axios.post("http://localhost:8080/refresh", null, {
            withCredentials: true,
          });

          processQueue(null);
          isRefreshing = false;

          return api(originalRequest);
        } catch (err) {
          if (err instanceof AxiosError) {
            processQueue(err);
            isRefreshing = false;
            return Promise.reject(err);
          }
        }
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
    }

    return Promise.reject(error);
  }
);

export default api;
