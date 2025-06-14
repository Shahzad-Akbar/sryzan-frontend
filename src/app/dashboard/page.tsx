'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useUIStore } from '@/store/ui.store';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { CategorySection } from './components/CategorySection';
import { PopularDishesSection } from './components/PopularDishesSection';
import { RecentOrdersSection } from './components/RecentOrdersSection';
import { CartPayload } from '@/types/cart';

export default function DashboardPage() {
  const { leftSidebarOpen, rightSidebarOpen, setLeftSidebarOpen, setRightSidebarOpen } = useUIStore();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      setMenuItems(data.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item: CartPayload) => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleRemoveFromCart = async (itemId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      });
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftSidebar isOpen={leftSidebarOpen} onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)} />

      <div className="flex-1 overflow-y-auto h-screen">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-neutral">Hello, User</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/50"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="What do you want eat today..."
                  className="w-[400px] pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary-2"
                />
              </div>
            </div>
          </div>
          {/* Banner */}
          <div className="rounded-2xl mb-8 relative overflow-hidden">
            <Image
              src="/assets/images/dashboard/banner.svg"
              alt="Discount"
              width={400}
              height={300}
              className="h-full w-full object-contain"
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <CategorySection />
            </>
          )}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <PopularDishesSection menuData={menuItems} handleAddToCart={handleAddToCart} />
            </>
          )}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <RecentOrdersSection menuData={menuItems} handleAddToCart={handleAddToCart} />
            </>
          )}
        </div>
      </div>

      <RightSidebar
        isOpen={rightSidebarOpen}
        onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
}
