'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ChevronRight, ShoppingCart } from 'lucide-react';
import { Dish } from './PopularDishesSection';
import { CartPayload } from '@/types/cart';

interface Orders {
  id: number;
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: string;
  restaurantId: number;
  updatedAt: string;
}

export const RecentOrdersSection = ({
  menuData,
  handleAddToCart
}: {
  menuData: Dish[];
  handleAddToCart: (item: CartPayload) => void;
}) => {
  const [orders, setOrders] = useState<Orders[]>([])
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
   setOrders(menuData)
  }, [menuData]);

  const toggleFavorite = (orderId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(orderId)) {
        newFavorites.delete(orderId);
      } else {
        newFavorites.add(orderId);
      }
      return newFavorites;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Recent Order</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl">
            <div className="relative">
              <Image
                src={`/assets/images/menu/${order.name}.jpg`}
                alt={order.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={() => toggleFavorite(order.id)}
                className="absolute top-1 right-4 p-2"
              >
                <Heart
                  fill={favorites.has(order.id) ? "#FF6B6B" : "#DBDBDB"}
                  color={favorites.has(order.id) ? "#FF6B6B" : "#DBDBDB"}
                  size={20}
                  className={favorites.has(order.id) ? "text-red-500" : "text-neutral/70"}
                />
              </button>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-neutral mb-2">{order.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">₹{order.price}</span>
                <button
                  onClick={async () => {
                    handleAddToCart({
                      menuItemId: order.id,
                      quantity: 1,
                    });
                  }}
                  className="p-2.5 bg-secondary-1 rounded-full hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
