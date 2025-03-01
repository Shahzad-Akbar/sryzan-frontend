export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  isActive: boolean;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  categoryId: string;
  isAvailable: boolean;
  preparationTime?: number;
  ingredients?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface OrderItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  deliveryFee: number;
  tax: number;
  subtotal: number;
  estimatedDeliveryTime?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'delivered';
export type PaymentMethod = 'cash' | 'card' | 'upi';
