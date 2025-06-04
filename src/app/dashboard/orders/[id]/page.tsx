'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/types/order';
import formatDate from '@/utils/format_date';
import formatTime from '@/utils/format_time';
import stringToNumber from '@/utils/string_to_number';
import Loader from '@/components/ui/loader';
import { Info } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/order/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data?.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Could not load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const canCancel = () => {
    const currentTime = new Date();
    const orderTime = new Date(order?.createdAt || '');
    const cancelWindow = 2 * 60 * 1000;
    return currentTime.getTime() - orderTime.getTime() < cancelWindow;
  };

  const showErrorToast = (msg: string) => {
    setError(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleCancelOrder = async () => {
    if (!canCancel()) {
      showErrorToast('You can only cancel the order within 2 minutes of its creation.');
      return;
    }

    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: 'POST',
        body: JSON.stringify({ status: 'cancelled' }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      setOrder(null);
      router.push('/dashboard/orders');
    } catch (error) {
      console.error('Error canceling order:', error);
      showErrorToast('Could not cancel order. Please try again later.');
    }
  };

  const handleBack = () => router.back();

  if (loading) return <Loader />;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-2">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md animate-fade-in">
          <div className="text-red-500 mb-4 flex justify-center items-center">
            <Info size={48} />
          </div>
          <h2 className="text-xl font-medium mb-2">Error Loading Order</h2>
          <p className="text-neutral/70 mb-6">{error || 'Order not found.'}</p>
          <button
            className="bg-primary-2 text-white px-4 py-2 rounded-full hover:bg-primary-1"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = formatDate(order.createdAt);
  const formattedTime = formatTime(order.createdAt);
  const subtotal = stringToNumber(order.price);
  const serviceCharge = 20.0;
  const total = parseFloat(order.totalAmount);

  return (
    <div className="min-h-screen bg-neutral-2 py-8 px-4 sm:px-6 lg:px-8 relative">
      {showToast && error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 text-red-800 px-4 py-2 rounded-md shadow-md text-sm animate-fade-in">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral">Order Details</h1>
          <button
            className="bg-primary-2 text-white px-4 py-2 rounded-full hover:bg-primary-1"
            onClick={handleBack}
          >
            Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-neutral/70">
                  {formattedDate} at {formattedTime}
                </p>
              </div>

              {order.status === 'pending' && (
                <button
                  onClick={handleCancelOrder}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          {['pending', 'preparing', 'ready'].includes(order.status) && (
            <div className="p-6 border-b bg-neutral-2/30">
              <h3 className="font-medium mb-4">Order Progress</h3>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {['Order Placed', 'Preparing', 'Ready for Pickup'].map((step, index) => {
                    const statuses = ['pending', 'preparing', 'ready'];
                    const isActive = statuses.indexOf(order.status) >= index;
                    return (
                      <div className="text-center flex-1" key={index}>
                        <div
                          className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                            isActive ? 'bg-secondary-1 text-white' : 'bg-neutral-2 text-neutral'
                          }`}
                        >
                          {isActive ? '✓' : index + 1}
                        </div>
                        <p className="text-sm mt-1">{step}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-3 left-0 right-0 h-1 bg-neutral-2 -z-10">
                  <div
                    className="h-full bg-secondary-1 transition-all"
                    style={{
                      width:
                        order.status === 'pending'
                          ? '0%'
                          : order.status === 'preparing'
                          ? '50%'
                          : '100%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <h3 className="font-medium mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral/70">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral/70">Service Charge</span>
                <span>₹{serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-medium text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="pt-3">
                <p className="text-sm text-neutral/70">Paid via Wallet Balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
    preparing: { color: 'bg-yellow-100 text-yellow-800', label: 'Preparing' },
    ready: { color: 'bg-green-100 text-green-800', label: 'Ready for Pickup' },
    delivered: { color: 'bg-secondary-1 bg-opacity-10 text-secondary-1', label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <span className={`${config?.color} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {config?.label}
    </span>
  );
}
