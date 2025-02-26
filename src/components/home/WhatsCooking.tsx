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
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          See What is Cooking In <span className="text-orange-500">[City]</span>?
        </h2>
        <p className="text-gray-600">
          These Dishes Are Stealing The Show Today. Order Now Before They Sell Out!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {cookingItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 relative group">
            <div className="relative mb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-auto rounded-xl"
              />
              <button className="absolute bottom-4 right-4 bg-cyan-400 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xl">🛒</span>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  <Image src="/assets/images/temp/1.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                  <Image src="/assets/images/temp/2.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                  <Image src="/assets/images/temp/3.jpeg" alt="user" width={24} height={24} className="rounded-full border-2 border-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>({item.rating})</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 text-lg">
          See More Dishes
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  )
}