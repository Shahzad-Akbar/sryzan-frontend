import { create } from 'zustand';
import { CartStore } from '@/types/store';
// import { PaymentMethod } from '@/types/api';

const TAX_RATE = 0.05; // 5% tax
const DELIVERY_FEE = 20; // Fixed delivery fee

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  deliveryAddress: '',
  paymentMethod: 'cash',
  
  addItem: (dish, quantity = 1, instructions = '') => {
    const items = [...get().items];
    const existingItem = items.find(item => item.dish.id === dish.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.specialInstructions = instructions;
    } else {
      items.push({ dish, quantity, specialInstructions: instructions });
    }
    
    set({ items });
  },
  
  removeItem: (dishId) => {
    set({ items: get().items.filter(item => item.dish.id !== dishId) });
  },
  
  updateQuantity: (dishId, quantity) => {
    const items = get().items.map(item =>
      item.dish.id === dishId ? { ...item, quantity } : item
    );
    set({ items });
  },
  
  updateInstructions: (dishId, instructions) => {
    const items = get().items.map(item =>
      item.dish.id === dishId ? { ...item, specialInstructions: instructions } : item
    );
    set({ items });
  },
  
  clearCart: () => set({ items: [] }),
  
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  
  get subtotal() {
    return get().items.reduce((sum, item) => 
      sum + (item.dish.price * item.quantity), 0
    );
  },
  
  get tax() {
    return get().subtotal * TAX_RATE;
  },
  
  get deliveryFee() {
    return DELIVERY_FEE;
  },
  
  get total() {
    return get().subtotal + get().tax + get().deliveryFee;
  },
  
  checkout: async () => {
    set({ isLoading: true, error: null });
    try {
      // Implement checkout logic here
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Checkout failed',
        isLoading: false 
      });
    }
  }
}));