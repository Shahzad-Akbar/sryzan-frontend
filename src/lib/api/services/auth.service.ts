import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { useAuthStore } from '@/store/auth.store';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    const { accessToken, refreshToken, user } = response.data;
    
    useAuthStore.getState().setTokens(accessToken, refreshToken);
    useAuthStore.getState().setUser(user);
    
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    const { accessToken, refreshToken, user } = response.data;

    useAuthStore.getState().setTokens(accessToken, refreshToken);
    useAuthStore.getState().setUser(user);

    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.get(`${API_ENDPOINTS.VERIFY_EMAIL}/${token}`);
    return response.data;
  },

  resendVerificationEmail: async (email: string) => {
    const response = await apiClient.post(API_ENDPOINTS.RESEND_VERIFICATION, { email });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, { token, newPassword });
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
    return response.data;
  },

  logout: () => {
    useAuthStore.getState().logout();
  }
};