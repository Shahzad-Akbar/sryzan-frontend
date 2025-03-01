import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export const foodService = {
  getCategories: async () => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  getPopularDishes: async () => {
    const response = await apiClient.get(API_ENDPOINTS.POPULAR_DISHES);
    return response.data;
  },

  getRecentOrders: async () => {
    const response = await apiClient.get(API_ENDPOINTS.RECENT_ORDERS);
    return response.data;
  },
};