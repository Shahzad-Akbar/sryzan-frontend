'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useUIStore } from '@/store/ui.store'
import { LeftSidebar } from './components/LeftSidebar'
import { RightSidebar } from './components/RightSidebar'
import { CategorySection } from './components/CategorySection'
import { PopularDishesSection } from './components/PopularDishesSection'
import { RecentOrdersSection } from './components/RecentOrdersSection'
import { useAuthStore } from '@/store/auth.store'

export default function DashboardPage() {
  const { 
    leftSidebarOpen, 
    rightSidebarOpen, 
    setLeftSidebarOpen, 
    setRightSidebarOpen 
  } = useUIStore();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftSidebar 
        isOpen={leftSidebarOpen} 
        onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)} 
      />

      <div className="flex-1 overflow-y-auto h-screen">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-neutral">
                Hello, {user?.name?.split(' ')[0] || 'User'}
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/50" size={20} />
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
          <CategorySection />
          <PopularDishesSection />
          <RecentOrdersSection />
        </div>
      </div>

      <RightSidebar 
        isOpen={rightSidebarOpen} 
        onToggle={() => setRightSidebarOpen(!rightSidebarOpen)} 
      />
    </div>
  )
}