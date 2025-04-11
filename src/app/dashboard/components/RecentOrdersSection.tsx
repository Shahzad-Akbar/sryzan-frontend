'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Image from 'next/image';
import { Heart, ChevronRight } from 'lucide-react';

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


export function RecentOrdersSection(menuData: { menuData: SetStateAction<Orders[]>; }) {
  const [orders, setOrders] = useState<Orders[]>([])
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
   setOrders(menuData.menuData)
  }, []);

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

  // if (loading) {
  //   return (
  //     <div>
  //       <div className="flex justify-between items-center mb-4">
  //         <div className="h-7 w-36 bg-gray-200 animate-pulse rounded" />
  //         <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
  //       </div>
  //       <div className="grid grid-cols-3 gap-6">
  //         {[...Array(3)].map((_, index) => (
  //           <div key={index} className="bg-white p-4 rounded-2xl">
  //             <div className="relative">
  //               <div className="w-full h-48 bg-gray-200 animate-pulse rounded-xl" />
  //             </div>
  //             <div className="mt-4">
  //               <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2" />
  //               <div className="flex items-center justify-between">
  //                 <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
  //                 <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

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
                {/* <span className="text-sm text-neutral/70 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-1"></span>
                  {order.distance} • {order.time}
                </span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
