'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams} from 'next/navigation';
import { Order, OrderStatus } from '@/types/order';
import formatDate from '@/utils/format_date';
import formatTime from '@/utils/format_time';
import stringToNumber from '@/utils/string_to_number';
import Loader from '@/components/ui/loader';
import { Info } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id
  console.log(orderId)
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/order/${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
        setError('Could not load order details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrderDetails()
  }, [orderId])
  
  if (loading) {
    return (
      <Loader />
    )
  }
  
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-2">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <div className="text-red-500 mb-4 flex justify-center items-center">
            <Info size={48} />
          </div>
          <h2 className="text-xl font-medium mb-2">Error Loading Order</h2>
          <p className="text-neutral/70 mb-6">{error || 'Order not found'}</p>
          <Link href="/orders" className="btn-primary inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }
  
  // Format date
  const formattedDate = formatDate(order.createdAt);
  const formattedTime = formatTime(order.createdAt);
  
  const subtotal = stringToNumber(order.price)
  const serviceCharge = 20.00
  const total = parseFloat(order.totalAmount)
  
  return (
    <div className="min-h-screen bg-neutral-2 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral">Order Details</h1>
          <Link href="/orders" className="text-primary-2 hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Back to Orders
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Order Header */}
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-neutral/70">{formattedDate} at {formattedTime}</p>
              </div>
              
              {order.status === 'pending' && (
                <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
          
          {/* Order Progress (for active orders) */}
          {['pending', 'preparing', 'ready'].includes(order.status) && (
            <div className="p-6 border-b bg-neutral-2/30">
              <h3 className="font-medium mb-4">Order Progress</h3>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <div className="text-center flex-1">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${order.status !== 'pending' ? 'bg-secondary-1 text-white' : 'bg-neutral-2 text-neutral'}`}>
                      {order.status !== 'pending' ? '✓' : '1'}
                    </div>
                    <p className="text-sm mt-1">Order Placed</p>
                  </div>
                  <div className="text-center flex-1">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${order.status === 'preparing' || order.status === 'ready' ? 'bg-secondary-1 text-white' : 'bg-neutral-2 text-neutral'}`}>
                      {order.status === 'preparing' || order.status === 'ready' ? '✓' : '2'}
                    </div>
                    <p className="text-sm mt-1">Preparing</p>
                  </div>
                  <div className="text-center flex-1">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${order.status === 'ready' ? 'bg-secondary-1 text-white' : 'bg-neutral-2 text-neutral'}`}>
                      {order.status === 'ready' ? '✓' : '3'}
                    </div>
                    <p className="text-sm mt-1">Ready for Pickup</p>
                  </div>
                </div>
                <div className="absolute top-3 left-0 right-0 h-1 bg-neutral-2 -z-10">
                  <div 
                    className="h-full bg-secondary-1" 
                    style={{ 
                      width: order.status === 'pending' ? '0%' : 
                             order.status === 'preparing' ? '50%' : '100%' 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Order Summary */}
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
          
          {/* Order Actions */}
          <div className="p-6 bg-neutral-2/30 flex flex-wrap gap-3">
            <button className="px-4 py-2 border border-neutral/20 text-neutral rounded-lg hover:bg-white">
              Get Help
            </button>
            
            {order.status === 'delivered' && (
              <button className="px-4 py-2 bg-primary-2 text-white rounded-lg hover:opacity-90">
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Status badge component (same as in the orders page)
function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
    preparing: { color: 'bg-yellow-100 text-yellow-800', label: 'Preparing' },
    ready: { color: 'bg-green-100 text-green-800', label: 'Ready for Pickup' },
    delivered: { color: 'bg-secondary-1 bg-opacity-10 text-secondary-1', label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
  }
  
  const config = statusConfig[status]
  
  return (
    <span className={`${config.color} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {config.label}
    </span>
  )
}