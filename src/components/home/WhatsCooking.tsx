import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

const cookingItems = [
  {
    id: 1,
    name: 'Kebab',
    image: '/assets/images/temp/kabab.jpg', // Update extension if different
    rating: 4.5,
    description: 'Lorem ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry'
  },
  {
    id: 2,
    name: 'Chicken Tikka',
    image: '/assets/images/temp/Tikkas.jpg', // Update extension if different
    rating: 4.8,
    description: 'Lorem ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry'
  },
  {
    id: 3,
    name: 'Desi Chowmein',
    image: '/assets/images/temp/chowmin.jpg', // Update extension if different
    rating: 4.2,
    description: 'Lorem ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry'
  },
  {
    id: 4,
    name: 'Chicken Chargha',
    image: '/assets/images/temp/chargha.jpg', // Update extension if different
    rating: 5.0,
    description: 'Lorem ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry'
  }
]

export default function WhatsCooking() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-poppins font-bold mb-4">
          See What is Cooking In <span className="text-primary-2">[City]</span>?
        </h2>
        <p className="text-neutral/70 text-lg">
          These Dishes Are Stealing The Show Today. Order Now Before They Sell Out!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {cookingItems.map((item) => (
          <div 
            key={item.id} 
            className="w-[310px] h-[469px] bg-neutral-white rounded-[20px] p-6 relative group hover:shadow-lg transition-shadow duration-300 mx-auto"
            style={{
              background: 'linear-gradient(179.69deg, rgba(255, 255, 255, 0) -31.53%, #FFD166 303.75%)'
            }}
          >
            <div className="relative mb-6 flex justify-center">
              <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden flex items-center justify-center bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="object-contain"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <button 
                className="absolute bottom-2 right-[55px] bg-secondary-1 text-neutral-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-secondary-1/90 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[368px] rounded-[20px] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex -space-x-2">
                  <Image 
                    src="/assets/images/temp/1.jpeg" 
                    alt="user" 
                    width={28} 
                    height={28} 
                    className="rounded-full border-2 border-neutral-white" 
                  />
                  <Image 
                    src="/assets/images/temp/2.jpeg" 
                    alt="user" 
                    width={28} 
                    height={28} 
                    className="rounded-full border-2 border-neutral-white" 
                  />
                  <Image 
                    src="/assets/images/temp/3.jpeg" 
                    alt="user" 
                    width={28} 
                    height={28} 
                    className="rounded-full border-2 border-neutral-white" 
                  />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-[#FFB800]">⭐</span>
                  <span className="font-medium">({item.rating})</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-neutral mb-2">
                {item.name}
              </h3>
              <p className="text-neutral/70 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-primary-2 text-neutral-white px-8 py-3 rounded-full inline-flex items-center gap-2 text-lg font-medium hover:opacity-90 transition-opacity">
          See More Dishes
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  )
}