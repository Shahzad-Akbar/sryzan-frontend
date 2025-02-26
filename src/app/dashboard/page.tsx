'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Search, 
  LayoutDashboard, 
  UtensilsCrossed, 
  Heart, 
  MessageSquare, 
  Clock, 
  Receipt, 
  Settings,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Wallet,
  MapPin,
  Plus,
  Minus,
  X,
  ChevronRightCircle
} from 'lucide-react'

const categories = [
  { name: 'Bakery', icon: '/assets/icons/category/baked.svg' },
  { name: 'Burger', icon: '/assets/icons/category/burger.svg' },
  { name: 'Beverage', icon: '/assets/icons/category/coffee.svg' },
  { name: 'Chicken', icon: '/assets/icons/category/chicken.svg' },
  { name: 'Pizza', icon: '/assets/icons/category/pizza.svg' },
  { name: 'Seafood', icon: '/assets/icons/category/seafood.svg' }
]

const popularDishes = [
  { id: 1, name: 'Fish Burger', price: '199.59', image: '/assets/images/dishes/fish-burger.svg' },
  { id: 2, name: 'Beef Burger', price: '299.59', image: '/assets/images/dishes/beef-burger.svg' },
  { id: 3, name: 'Cheese Burger', price: '65.49', image: '/assets/images/dishes/cheese-burger.svg' }
]

const recentOrders = [
  { id: 1, name: 'Fish Burger', price: '99.42', image: '/assets/images/dishes/fish-burger.svg', distance: '4.97 km', time: '21 min' },
  { id: 2, name: 'Japan Ramen', price: '299.59', image: '/assets/images/dishes/japan-ramen.svg', distance: '4.97 km', time: '21 min' },
  { id: 3, name: 'Fried Rice', price: '95.59', image: '/assets/images/dishes/fried-rice.svg', distance: '4.97 km', time: '21 min' }
]

export default function DashboardPage() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className={`${leftSidebarOpen ? 'w-64' : 'w-20'} bg-white h-screen p-6 flex flex-col gap-4 relative transition-all duration-300`}>
        <div className="flex items-center gap-2">
          {leftSidebarOpen && <Image src="/assets/images/logo/sryzan.svg" alt="sryzans" width={120} height={40} />}
        </div>
        
        <button 
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="absolute -right-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
        >
          {leftSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        
        <nav className="mt-8 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-2/10 text-primary-2 rounded-lg">
            <LayoutDashboard size={24} />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <UtensilsCrossed size={24} />
            Food Order
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <Heart size={24} />
            Favorite
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <MessageSquare size={24} />
            Message
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <Clock size={24} />
            Order History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <Receipt size={24} />
            Bills
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral/70 hover:bg-gray-50 rounded-lg">
            <Settings size={24} />
            Setting
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-neutral">Hello, Sara</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/50" size={20} />
            <input
              type="text"
              placeholder="What do you want eat today..."
              className="w-[400px] pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary-2"
            />
          </div>
        </div>

        {/* Discount Banner */}
        <div className="rounded-2xl  mb-8 relative overflow-hidden">
         
          <Image
            src="/assets/images/dashboard/banner.svg"
            alt="Discount"
            width={400}
            height={300}
            className="h-full w-full object-contain"
          />
        </div>
        {/* Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-neutral">Category</h3>
            <button className="text-primary-2 flex items-center gap-1">
              View all <ChevronRightCircle size={16} />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50"
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="mb-2"
                />
                <span className="text-sm text-neutral">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-neutral">Popular Dishes</h3>
            <button className="text-primary-2 flex items-center gap-1">
              View all <ChevronRightCircle size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="bg-white p-4 rounded-xl">
                <div className="relative">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-[#38F2AF] text-white text-sm px-2 py-1 rounded">15% Off</span>
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
                    <Heart size={20} className="text-neutral/70" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <h4 className="font-semibold text-neutral mb-1">{dish.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-2 font-semibold">₹{dish.price}</span>
                    <button className="p-2 bg-primary-2/10 rounded-full">
                      <ShoppingCart size={20} className="text-primary-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-neutral">Recent Order</h3>
            <button className="text-primary-2 flex items-center gap-1">
              View all <ChevronRightCircle size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-xl">
                <div className="relative">
                  <Image
                    src={order.image}
                    alt={order.name}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
                    <Heart size={20} className="text-neutral/70" />
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-neutral mb-1">{order.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-2 font-semibold">₹{order.price}</span>
                    <span className="text-sm text-neutral/70">{order.distance} • {order.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`${rightSidebarOpen ? 'w-80' : 'w-0'} bg-white h-screen overflow-hidden transition-all duration-300 relative`}>
        <button 
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="absolute -left-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
        >
          {rightSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <div className="p-6">
          {/* Your Balance Section */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-neutral">Your Balance</h3>
              <span className="text-primary-2 font-bold">₹1,500.00</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-primary-2 text-white py-2 rounded-lg hover:opacity-90">
                <Plus size={16} /> Top Up
              </button>
              <button className="flex items-center justify-center gap-2 border border-primary-2 text-primary-2 py-2 rounded-lg hover:bg-primary-2/5">
                <Receipt size={16} /> Transfer
              </button>
            </div>
          </div>

          {/* Your Address Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-neutral">Your Address</h3>
              <button className="text-primary-2 text-sm hover:opacity-80">Change</button>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-primary-2 mt-1 flex-shrink-0" size={20} />
              <p className="text-sm text-neutral/70">123 Main Street, Apartment 4B, New York, NY 10001</p>
            </div>
          </div>

          {/* Order Menu */}
          <div>
            <h3 className="font-semibold text-neutral mb-4">Order Menu</h3>
            <div className="space-y-4 mb-6">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/assets/images/dishes/burger-${item}.png`}
                      alt="Food"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-neutral">Beef Burger</h4>
                      <span className="text-sm text-primary-2">₹299.59</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Minus size={16} /></button>
                    <span className="w-8 text-center">1</span>
                    <button className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Plus size={16} /></button>
                    <button className="p-1 text-red-500 hover:text-red-600"><X size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral/70">Subtotal</span>
                <span>₹599.18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral/70">Service Charge</span>
                <span>₹20.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary-2">₹619.18</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-primary-2 text-white py-3 rounded-xl mt-6 hover:opacity-90 transition-opacity">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}