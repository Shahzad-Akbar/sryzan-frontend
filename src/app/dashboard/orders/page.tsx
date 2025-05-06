'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types/order';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Loader from '@/components/ui/loader';
import OrderCard from './components/OrderCard';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/order');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on active tab
  const activeOrders = orders.filter((order) =>
    ['pending', 'preparing', 'ready'].includes(order.status),
  );
  const completedOrders = orders.filter((order) =>
    ['delivered', 'cancelled'].includes(order.status),
  );
  const displayOrders = activeTab === 'active' ? activeOrders : completedOrders;

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-2 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral">My Orders</h1>
          <Link href="/" className="text-primary-2 hover:underline flex items-center gap-1">
            <ChevronLeft />
            Back to Menu
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl p-4 flex space-x-4 border-b">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'active'
                ? 'bg-primary-2 text-white'
                : 'bg-neutral-2 text-neutral hover:bg-neutral/10'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Orders
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'completed'
                ? 'bg-primary-2 text-white'
                : 'bg-neutral-2 text-neutral hover:bg-neutral/10'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Order History
          </button>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
          {displayOrders.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-24 h-24 mx-auto mb-4 text-neutral/30">
                <ShoppingCart />
              </div>
              <h2 className="text-xl font-medium text-neutral mb-2">No orders found</h2>
              <p className="text-neutral/70 mb-6">
                {activeTab === 'active'
                  ? "You don't have any active orders at the moment."
                  : "You haven't completed any orders yet."}
              </p>
              <Link href="/" className="btn-primary inline-block">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {displayOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




