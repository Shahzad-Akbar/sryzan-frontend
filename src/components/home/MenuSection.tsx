import Image from 'next/image'
import { menuItems } from '@/constants/data'
import { ShoppingCart } from 'lucide-react'

const categories = ['All', 'Veg', 'Non Veg', 'No Egg', 'Drinks']

export default function MenuSection() {
  return (
    <section className="mx-auto px-4 py-16 bg-[#F8FAFC]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          <span className="text-primary-2">Menu</span> That <span className="text-primary-2">Always</span> Make
        </h2>
        <h3 className="text-4xl font-bold">
          You Fall In <span className="text-primary-2">Love</span>
        </h3>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full border ${
              category === 'All' 
                ? 'bg-primary-2 text-white border-primary-2' 
                : 'bg-white border-neutral-2 hover:bg-primary-2 hover:text-white hover:border-primary-2'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 relative group hover:shadow-lg transition-all">
            <div className="relative mb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
              />
              <button className="absolute bottom-3 right-3 bg-[#40E0D0] text-white w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xl">
                  <ShoppingCart />
                </span>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  <Image src="/assets/images/temp/4.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                  <Image src="/assets/images/temp/5.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                  <Image src="/assets/images/temp/6.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>({item.rating})</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-neutral text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}