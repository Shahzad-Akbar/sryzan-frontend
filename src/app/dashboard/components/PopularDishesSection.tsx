'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { CartPayload } from '@/types/cart';

export type Dish = {
  id: number;
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: string;
  restaurantId: number;
  updatedAt: string;
}

export const PopularDishesSection = ({
  menuData,
  handleAddToCart
}: {
  menuData: Dish[] ;
  handleAddToCart: (item: CartPayload) => void;
}) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (dishId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dishId)) {
        newFavorites.delete(dishId);
      } else {
        newFavorites.add(dishId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Popular Dishes</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {menuData.map((dish) => (
          <div key={dish.id} className="bg-white p-4 rounded-2xl">
            <div className="relative">
              <Image
                src={`/assets/images/menu/${dish.name}.jpg`}
                alt={dish.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
              />
              <span className="absolute top-1 -left-4 bg-secondary-1 text-white text-sm px-4 py-1.5 rounded-r-lg">
                15% Off
              </span>
              <button
                onClick={() => toggleFavorite(dish.id)}
                className="absolute top-1 right-4 p-2"
              >
                <Heart
                  fill={favorites.has(dish.id) ? "#FF6B6B" : "#DBDBDB"}
                  color={favorites.has(dish.id) ? "#FF6B6B" : "#DBDBDB"}
                  size={20}
                  className={favorites.has(dish.id) ? "text-red-500" : "text-neutral/70"}
                />
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-0.5 text-primary-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <h4 className="text-lg font-semibold text-neutral mb-2">{dish.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">₹{dish.price}</span>
                <button
                  onClick={async () => {
                    handleAddToCart({
                      menuItemId: dish.id,
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
