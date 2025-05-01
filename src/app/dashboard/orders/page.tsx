// app/orders/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Order, OrderStatus } from '@/app/interfaces/orders'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/order')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])
  
  // Filter orders based on active tab
  const activeOrders = orders.filter(order => 
    ['pending', 'preparing', 'ready'].includes(order.status)
  )
  
  const completedOrders = orders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  )
  
  const displayOrders = activeTab === 'active' ? activeOrders : completedOrders
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-2"></div>
      </div>
    )
  }

  console.log('Fetched orders:', orders) // Log the fetched orders
  
  return (
    <div className="min-h-screen bg-neutral-2 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral">My Orders</h1>
          <Link href="/" className="text-primary-2 hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
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
  )
}

// Status badge component
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

// Order card component
function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false)
  
  // Format date
  const orderDate = new Date(order.createdAt)
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-medium">Order #{order.id}</h3>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-neutral/70">{formattedDate} at {formattedTime}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">₹{parseFloat(order.totalAmount).toFixed(2)}</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}