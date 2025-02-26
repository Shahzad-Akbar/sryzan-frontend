import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, Plus, Minus, Receipt, X } from 'lucide-react'

interface RightSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function RightSidebar({ isOpen, onToggle }: RightSidebarProps) {
  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} bg-white h-screen overflow-hidden transition-all duration-300 relative`}>
      <button 
        onClick={onToggle}
        className="absolute -left-4 top-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      {/* ... existing right sidebar content ... */}
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
  )
}