import Image from 'next/image'
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Download, 
  ArrowUpRight,
  MessageSquare,
  Bell,
  Settings
} from 'lucide-react'

interface RightSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const orderItems = [
  { name: 'Pepperoni Pizza', price: '70.59', image: '/assets/images/dishes/pepperoni-pizza.png' },
  { name: 'Cheese Burger', price: '65.49', image: '/assets/images/dishes/cheese-burger.png' },
  { name: 'Vegan Pizza', price: '50.09', image: '/assets/images/dishes/vegan-pizza.png' },
]

export function RightSidebar({ isOpen, onToggle }: RightSidebarProps) {
  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} bg-white h-screen transition-all duration-300 relative`}>
      <button 
        onClick={onToggle}
        className="absolute -left-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      {/* ... existing right sidebar content ... */}
      <div className="p-6">
        {/* Header Icons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <MessageSquare className="text-neutral/70" size={24} />
            <Bell className="text-neutral/70" size={24} />
            <Settings className="text-neutral/70" size={24} />
          </div>
          <Image
            src="/assets/images/avatar.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        {/* Balance Card */}
        <div className="relative bg-[#FFB800] rounded-xl p-4 mb-6 overflow-hidden">
          <Image
            src="/assets/images/dashboard/bg-balance.svg"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="relative z-10">
            <h3 className="text-white mb-2">Your Balance</h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
              <span className="text-white text-xl font-bold">₹1200</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-white rounded-lg py-2 px-3 flex items-center justify-center gap-1">
                <Download size={16} />
                Top Up
              </button>
              <button className="flex-1 bg-white rounded-lg py-2 px-3 flex items-center justify-center gap-1">
                <ArrowUpRight size={16} />
                Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Your Address</h3>
            <button className="text-primary-2 text-sm">Change</button>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="text-primary-2 flex-shrink-0 mt-1" size={18} />
            <p className="text-sm text-neutral/70">Elm Street, 23</p>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 border border-neutral/20 rounded-lg py-2 text-sm">Add Details</button>
            <button className="flex-1 border border-neutral/20 rounded-lg py-2 text-sm">Add Note</button>
          </div>
        </div>

        {/* Order Menu */}
        <div>
          <h3 className="font-medium mb-4">Order Menu</h3>
          <div className="space-y-4 mb-6">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <span className="text-primary-2">+₹{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Charge */}
          <div className="text-sm flex justify-between mb-3">
            <span className="text-neutral/70">Service</span>
            <span>+₹20.00</span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-medium mb-6">
            <span>Total</span>
            <span>₹206.17</span>
          </div>

          {/* Coupon Code */}
          <button className="w-full border border-neutral/20 rounded-xl py-3 mb-4 flex items-center justify-between px-4">
            <span className="text-neutral/70">Have a coupon code?</span>
            <ChevronRight size={20} className="text-neutral/70" />
          </button>

          {/* Checkout Button */}
          <button className="w-full bg-primary-2 text-white py-3 rounded-xl hover:opacity-90 transition-opacity">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}