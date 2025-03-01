export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
}

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  
  // Food
  CATEGORIES: '/food/categories',
  POPULAR_DISHES: '/food/popular',
  RECENT_ORDERS: '/food/recent-orders',
  
  // Orders
  CREATE_ORDER: '/orders/create',
  ORDER_HISTORY: '/orders/history',
  
  // User
  USER_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/update',
};