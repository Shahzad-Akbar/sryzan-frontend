'use server';
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

export const setupAuthInterceptor = async (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = cookieStore.get('token')?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.withCredentials = true;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const cookieStore = await cookies();

  const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    failedQueue = [];
  };

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Don't retry for these endpoints to avoid infinite loops
      const skipRetryEndpoints = ['/auth/login', '/auth/refresh-token'];
      if (skipRetryEndpoints.some((endpoint) => originalRequest.url?.includes(endpoint))) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          } catch (error) {
            return Promise.reject(error);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = cookieStore.get('refreshToken')?.value;

          // Check if refreshToken is available before making the API call
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await apiClient.post(
            '/api/auth/refresh-token',
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );
          const { accessToken, newRefreshToken } = response.data;

          cookieStore.set('token', accessToken, { maxAge: 900 });
          cookieStore.set('refreshToken', newRefreshToken, {
            maxAge: 900 * 24 * 7,
          });
          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as Error);
          // Redirect to login page after logout
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cookieStore.getAll().forEach((cookie: any) => {
            cookieStore.delete(cookie.name);
          });
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
