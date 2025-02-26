import Image from 'next/image'
import { Heart, ChevronRight } from 'lucide-react'
import { recentOrders } from '../data'

export function RecentOrdersSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Recent Order</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {recentOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl">
            <div className="relative">
              <Image
                src={order.image}
                alt={order.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
              />
              <button className="absolute top-1 right-4 p-2">
                <Heart fill='#DBDBDB' color='#DBDBDB' size={20} />
              </button>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-neutral mb-2">{order.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">₹{order.price}</span>
                <span className="text-sm text-neutral/70 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-1"></span>
                  {order.distance} • {order.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}