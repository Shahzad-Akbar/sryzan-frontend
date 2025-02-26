import Image from 'next/image'
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Heart, 
  MessageSquare, 
  Clock, 
  Receipt, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface LeftSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white h-screen p-6 flex flex-col gap-4 relative transition-all duration-300`}>
      <div className="flex items-center gap-2">
        {isOpen && <Image src="/assets/images/logo/sryzan.svg" alt="sryzans" width={120} height={40} />}
      </div>
      
      <button 
        onClick={onToggle}
        className="absolute -right-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
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
  )
}