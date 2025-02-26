'use client'

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
  ShoppingCart
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/images/logo/sryzan.svg" alt="sryzans" width={120} height={40} />
          </div>
          
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
        <div className="flex-1 p-8">
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
              <button className="text-primary-2">View all</button>
            </div>
            <div className="grid grid-cols-8 gap-4">
              {['Bakery', 'Burger', 'Beverage', 'Chicken', 'Pizza'].map((category) => (
                <button
                  key={category}
                  className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50"
                >
                  <Image
                    src={`/assets/icons/categories/${category.toLowerCase()}.svg`}
                    alt={category}
                    width={32}
                    height={32}
                  />
                  <span className="mt-2 text-sm text-neutral">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Dishes */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-neutral">Popular Dishes</h3>
              <button className="text-primary-2">View all</button>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-4 rounded-xl">
                  <div className="relative">
                    <Image
                      src={`/assets/images/dishes/burger-${item}.png`}
                      alt="Burger"
                      width={200}
                      height={200}
                      className="w-full h-auto"
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
                    <h4 className="font-semibold text-neutral mb-1">Beef Burger</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-2 font-semibold">₹299.59</span>
                      <button className="p-2 bg-primary-2/10 rounded-full">
                        <ShoppingCart size={20} className="text-primary-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}