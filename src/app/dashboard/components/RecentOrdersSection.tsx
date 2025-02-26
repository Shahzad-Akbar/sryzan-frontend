import Image from 'next/image'
import { Heart, ChevronRightCircle } from 'lucide-react'
import { recentOrders } from '../data'

export function RecentOrdersSection() {
  return (
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
  )
}