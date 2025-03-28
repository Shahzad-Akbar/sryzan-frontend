import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse, Category, Dish, Order } from '@/types/api';

export const dashboardService = {
  getUserProfile: async () => {
    const response = await apiClient.get<ApiResponse<{ name: string }>>(API_ENDPOINTS.USER_PROFILE);
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  getPopularDishes: async () => {
    const response = await apiClient.get<ApiResponse<Dish[]>>(API_ENDPOINTS.POPULAR_DISHES);
    return response.data;
  },

  getRecentOrders: async () => {
    const response = await apiClient.get<ApiResponse<Order[]>>(API_ENDPOINTS.RECENT_ORDERS);
    return response.data;
  },

  //   searchDishes: async (query: string) => {
  //     const response = await apiClient.get<ApiResponse<Dish[]>>(`${API_ENDPOINTS.SEARCH_DISHES}?q=${query}`);
  //     return response.data;
  //   }
};
