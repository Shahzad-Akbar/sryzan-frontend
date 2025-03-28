import { Dish } from './api';
import type { PaymentMethod } from './api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (dish: Dish, quantity?: number, instructions?: string) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  updateInstructions: (dishId: string, instructions: string) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  setPaymentMethod: (method: PaymentMethod) => void;
  setDeliveryAddress: (address: string) => void;
  checkout: () => Promise<void>;
}

export interface UIStore {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  };
  setLeftSidebarOpen: (open: boolean) => void;
  setRightSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  showModal: (modalId: string) => void;
  hideModal: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}
