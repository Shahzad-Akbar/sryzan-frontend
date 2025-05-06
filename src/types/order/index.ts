export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  price: string;
  Restaurant: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  status: OrderStatus;
  totalAmount: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  price: string;
  MenuItem: {
    id: number;
    name: string;
    price: string;
    description?: string;
    image?: string;
  };
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
