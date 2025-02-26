import Image from 'next/image'
import { ChevronRightCircle } from 'lucide-react'
import { categories } from '../data'

export function CategorySection() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Category</h3>
        <button className="text-primary-2 flex items-center gap-1">
          View all <ChevronRightCircle size={16} />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50"
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={40}
              height={40}
              className="mb-2"
            />
            <span className="text-sm text-neutral">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}