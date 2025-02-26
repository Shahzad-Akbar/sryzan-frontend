import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { categories } from '../data'

export function CategorySection() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Category</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex flex-col items-center p-4 bg-white rounded-2xl hover:bg-gray-50/80 transition-colors"
          >
            <div className="bg-gray-50 p-3 rounded-xl mb-3">
              <Image
                src={category.icon}
                alt={category.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-sm font-medium text-neutral">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}