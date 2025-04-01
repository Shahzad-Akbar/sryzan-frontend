'use server';
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: Error | unknown) => void;
}[] = [];

export const setupAuthInterceptor = async (apiClient: AxiosInstance) => {
  const cookieStore = await cookies();

  // Request Interceptor
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = cookieStore.get('token')?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.withCredentials = true; // Ensure cookies are sent with requests
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Function to process the queue of failed requests
  const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    failedQueue = []; // Clear the queue after processing
  };

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Skip retry for these endpoints to avoid infinite loops
      const skipRetryEndpoints = ['/auth/login', '/auth/refresh-token'];
      if (skipRetryEndpoints.some((endpoint) => originalRequest.url?.includes(endpoint))) {
        return Promise.reject(error);
      }

      // Handle token refresh logic
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = cookieStore.get('refreshToken')?.value;

          // Check if refreshToken is available before making the API call
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          console.log('Refreshing token...');
          const response = await apiClient.post(
            '/api/auth/refresh-token',
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          const { accessToken, newRefreshToken } = response.data;
          if (!accessToken || !newRefreshToken) {
            throw new Error('No access token or refresh token received');
          }
          console.log('Token refreshed successfully');

          // Update cookies with new tokens
          cookieStore.set('token', accessToken, { maxAge: 900 });
          cookieStore.set('refreshToken', newRefreshToken, {
            maxAge: 900 * 24 * 7,
          });

          processQueue(null, accessToken); // Resolve all queued requests

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest); // Retry the original request
        } catch (refreshError) {
          processQueue(refreshError as Error); // Reject all queued requests
          // Clear all cookies and redirect to login page
          cookieStore.getAll().forEach((cookie) => {
            cookieStore.delete(cookie.name);
          });
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false; // Reset the refreshing flag
        }
      }

      return Promise.reject(error); // Reject the original error
    },
  );
};
