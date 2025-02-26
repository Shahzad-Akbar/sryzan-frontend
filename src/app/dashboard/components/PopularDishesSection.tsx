import Image from 'next/image'
import { Star, Heart, ShoppingCart, ChevronRight   } from 'lucide-react'
import { popularDishes } from '../data'

export function PopularDishesSection() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Popular Dishes</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {popularDishes.map((dish) => (
          <div key={dish.id} className="bg-white p-4 rounded-2xl">
            <div className="relative">
              <Image
                src={dish.image}
                alt={dish.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
              />
              <span className="absolute top-1 -left-4 bg-secondary-1 text-white text-sm px-4 py-1.5 rounded-r-lg">
                15% Off
              </span>
              <button className="absolute top-1 right-4 p-2 ">
                <Heart fill='#DBDBDB' color='#DBDBDB' size={20} className="text-neutral/70" />
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-0.5 text-primary-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <h4 className="text-lg font-semibold text-neutral mb-2">{dish.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">₹{dish.price}</span>
                <button className="p-2.5 bg-secondary-1 rounded-full hover:opacity-90 transition-opacity">
                  <ShoppingCart size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}