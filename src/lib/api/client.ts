'use server';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api/config';
import { cookies } from 'next/headers';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to refresh token
const refreshToken = async () => {
  const cookieStore = await cookies();
  try {
    const response = await axios.post(
      API_BASE_URL + API_ENDPOINTS.REFRESH_TOKEN,
      {},
      { withCredentials: true },
    );
    const { accessToken, refreshToken } = response.data.access_token;
    cookieStore.set('token', accessToken, { maxAge: 900 });
    cookieStore.set('refreshToken', refreshToken, { maxAge: 604800 });
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    return null;
  }
};

// **Request Interceptor**
apiClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// **Response Interceptor**
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401 error), try to refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        if (!newToken) {
          return Promise.reject(error);
        }

        isRefreshing = false;
        refreshSubscribers.forEach((callback) => callback(newToken));
        refreshSubscribers = [];

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
