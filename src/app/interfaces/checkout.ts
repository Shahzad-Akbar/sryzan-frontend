// app/interfaces/checkout.ts
export interface CheckoutPageProps {
    orderTotal: number;
    items: CartItem[];
    walletBalance: number;
  }
  
  export interface CartItem {
    MenuItem: {
      name: string;
      price: string;
    };
    id: number;
    menuItemId: number;
    userId: number;
    quantity: number;
    orderId: number | null;
    price: string;
    createdAt: string;
    updatedAt: string;
  }