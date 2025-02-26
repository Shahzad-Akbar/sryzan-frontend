import Image from 'next/image'
import { Star, Heart, ShoppingCart, ChevronRightCircle } from 'lucide-react'
import { popularDishes } from '../data'

export function PopularDishesSection() {
  return (
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
  )
}