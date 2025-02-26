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

const menuItems = [
  { icon: <LayoutDashboard size={24} />, label: 'Dashboard', active: true },
  { icon: <UtensilsCrossed size={24} />, label: 'Food Order' },
  { icon: <Heart size={24} />, label: 'Favorite' },
  { icon: <MessageSquare size={24} />, label: 'Message' },
  { icon: <Clock size={24} />, label: 'Order History' },
  { icon: <Receipt size={24} />, label: 'Bills' },
  { icon: <Settings size={24} />, label: 'Setting' },
]

export function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white h-screen sticky top-0 transition-all duration-300`}>
      <button 
        onClick={onToggle}
        className="absolute -right-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${item.active 
                ? 'bg-primary-2 text-white' 
                : 'text-neutral/70 hover:bg-gray-50'
              }
              ${!isOpen && 'justify-center px-2'}
            `}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}