export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
}

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  VERIFY_EMAIL: '/api/auth/verify-email',
  RESEND_VERIFICATION: '/api/auth/resend-verification-email',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LOGOUT: '/api/auth/logout',

  // Cart
  GET_CART: '/api/cart',
  ADD_TO_CART: '/api/cart/:userId/items',
  REMOVE_FROM_CART: '/api/cart/',
  UPDATE_CART_ITEM_QUANTITY: '/api/cart/items/:id',
  CLEAR_CART: '/api/cart',

  // User
  USER_PROFILE: '/api/auth/profile',
  UPDATE_PROFILE: '/api/user/profile',

  // Restaurant
  RESTAURANTS: '/api/restaurants',
  RESTAURANT_DETAILS: '/api/restaurants/:id',
  RESTAURANT_MENU: '/api/restaurants/:id/menu',
  RESTAURANT_ORDERS: '/api/restaurants/:id/orders',

  // Menu Items
  GET_MENU_ITEMS: '/api/menu-item',

  // Orders
  CREATE_ORDER: '/api/order',
  GET_ORDERS: '/api/order',
  GENERATE_INVOICE: '/api/order',

  // Admin
  ADMIN_DASHBOARD_STATS: '/api/admin/stats',
  ADMIN_USERS: '/api/admin/users',
  ADMIN_UPDATE_USER: '/api/admin/users',
  ADMIN_DELETE_USER: '/api/admin/users',
  ADMIN_GET_RESTAURANTS: '/api/admin/restaurants',
  ADMIN_CREATE_RESTAURANT: '/api/admin/restaurants',
  ADMIN_UPDATE_RESTAURANT: '/api/admin/restaurants',
  ADMIN_DELETE_RESTAURANT: '/api/admin/restaurants',
  ADMIN_GET_MENU: '/api/admin/menu-items',
  ADMIN_CREATE_MENU_ITEM: '/api/admin/menu-items',
  ADMIN_UPDATE_MENU_ITEM: '/api/admin/menu-items',
  ADMIN_DELETE_MENU_ITEM: '/api/admin/menu-items',
  ADMIN_GET_ORDERS: '/api/admin/orders',
  ADMIN_UPDATE_ORDER: '/api/admin/orders/:id',
  ADMIN_DELETE_ORDER: '/api/admin/orders/:id',
  ADMIN_ORDER_ANALYTICS: '/api/admin/analytics/orders',
};
