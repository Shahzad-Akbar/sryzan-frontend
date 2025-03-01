import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { useAuthStore } from '@/store/auth.store';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    const { token, user } = response.data;
    
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setUser(user);
    
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  logout: () => {
    useAuthStore.getState().logout();
  }
};