import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Download,
  ArrowUpRight,
  MessageSquare,
  Bell,
  Settings,
  Trash2,
} from 'lucide-react';
import { UserDropdown } from './UserDropdown';

import { useRouter } from 'next/navigation';
import { CartPayload } from '@/types/cart';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  handleAddToCart: (item: CartPayload) => void;
  handleRemoveFromCart: (itemId: number) => void;
}

export type CartItem = {
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
};

// const orderItems = [
//   {
//     name: 'Pepperoni Pizza',
//     price: '70.59',
//     image: '/assets/images/dishes/pepperoni-pizza.svg',
//   },
//   {
//     name: 'Cheese Burger',
//     price: '65.49',
//     image: '/assets/images/dishes/cheese-burger.svg',
//   },
//   {
//     name: 'Vegan Pizza',
//     price: '50.09',
//     image: '/assets/images/dishes/vegan-pizza.svg',
//   },
// ];

export function RightSidebar({
  isOpen,
  onToggle,
  handleAddToCart,
  handleRemoveFromCart,
}: RightSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  // Fetch cart items from the api using axios
  const fetchCartItems = async () => {
    const response = await fetch('/api/cart');
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const data = await response.json();
    setCartItems(data);
    setCartItemCount(data.length);
    setCartTotal(
      data.reduce(
        (total: number, item: CartItem) => total + parseFloat(item.price) * item.quantity,
        0,
      ),
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, [handleAddToCart]);

  console.log(cartItems)
  return (
    <div className="relative">
      <div
        className={`${isOpen ? 'w-80' : 'w-5'} bg-white h-screen sticky top-0 transition-all duration-300 overflow-hidden`}
      >
        <div className="w-80 h-full">
          <div className="p-6 h-full flex flex-col">
            {/* Header Icons */}
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <div className="flex gap-4">
                <MessageSquare className="text-neutral/70" size={24} />
                <Bell className="text-neutral/70" size={24} />
                <Settings className="text-neutral/70" size={24} />
              </div>
              <UserDropdown />
            </div>

            {/* Balance Card */}
            <div className="relative bg-primary-2 rounded-xl p-4 mb-6 overflow-hidden flex-shrink-0">
              <Image
                src="/assets/images/dashboard/bg-balance.svg"
                alt="Background"
                fill
                className="object-cover"
              />
              <div className="relative z-10">
                <h3 className="text-white mb-2">Your Balance</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <span className="text-white text-xl font-bold">₹1200</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white rounded-lg py-2 px-3 flex items-center justify-center gap-1">
                    <Download size={16} />
                    Top Up
                  </button>
                  <button className="flex-1 bg-white rounded-lg py-2 px-3 flex items-center justify-center gap-1">
                    <ArrowUpRight size={16} />
                    Transfer
                  </button>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-6 flex-shrink-0">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Your Address</h3>
                <button className="text-primary-2 text-sm">Change</button>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="text-primary-2 flex-shrink-0 mt-1" size={18} />
                <p className="text-sm text-neutral/70">Elm Street, 23</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 border border-neutral/20 rounded-lg py-2 text-sm">
                  Add Details
                </button>
                <button className="flex-1 border border-neutral/20 rounded-lg py-2 text-sm">
                  Add Note
                </button>
              </div>
            </div>

            {/* Order Menu */}
            <div className="flex-1 min-h-0 flex flex-col">
              <h3 className="font-medium mb-4 flex-shrink-0">Order Menu</h3>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4 mb-6">
                  {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`/assets/images/menu/${item.MenuItem.name}.jpg`}
                            alt={item.MenuItem.name}
                            width={50}
                            height={50}
                            className="rounded-lg"
                          />
                          <div>
                            <h4 className="text-sm font-medium">{item.MenuItem.name}</h4>
                            <span className="text-primary-2">+₹{item.MenuItem.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Trash2
                            size={20}
                            className="text-neutral/70 cursor-pointer hover:text-red-500"
                            onClick={() => {
                              handleRemoveFromCart(item.id);
                              setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
                              setCartItemCount(cartItemCount - 1);
                              setCartTotal(cartTotal - parseFloat(item.price) * item.quantity);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 w-full h-[1px] bg-gray-200"></div>
                    </div>
                  ))
                  ) : (
                    <p className='text-center font-bold text-sm text-forground'>No items in cart</p>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                {/* Service Charge */}
                <div className="text-sm flex justify-between mb-3">
                  <span className="text-neutral/70">Service</span>
                  <span>+₹20.00</span>
                </div>

                {/* Total */}
                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>{cartTotal}</span>
                </div>

                {/* Coupon Code */}
                <button className="w-full border border-neutral/20 rounded-xl py-3 mb-4 flex items-center justify-between px-4">
                  <span className="text-neutral/70">Have a coupon code?</span>
                  <ChevronRight size={20} className="text-neutral/70" />
                </button>

                <button
                  onClick={() => {
                    router.push('/dashboard/checkout');
                  }}
                  className="w-full bg-primary-2 text-white py-3 rounded-xl hover:opacity-90 transition-opacity"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="absolute -left-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
}
