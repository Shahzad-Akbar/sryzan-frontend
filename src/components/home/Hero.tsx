import Image from 'next/image'
import { Search } from 'lucide-react'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-8">
      <div className="flex items-start justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <Image 
              src="/Logo.svg" 
              alt="sryzans" 
              width={200} 
              height={50} 
              className="h-6"
            />
          </div>
          <div className="mt-12">
            <h1 className="text-7xl font-bold mb-4 whitespace-nowrap text-black">
              Craving <span>Delicious</span>?
            </h1>
            <h2 className="text-7xl font-bold mb-12 text-black">
              Get Delivered<br />in <span className="text-secondary-1">Minutes!</span>
            </h2>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your delivery address in the town"
              className="w-full p-4 pl-6 pr-32 rounded-full border bg-neutral-2"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-neutral-2">Near Places</span>
              <button className="bg-secondary-1 text-white px-2 py-2 rounded-full hover:bg-orange-600">
                <Search />
              </button>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <button className="bg-primary-2 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-600">
              Check Availability
            </button>
            <a href="#menu" className="text-secondary-1 text-lg font-medium hover:text-secondary-1">
              See Menu
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-neutral-2">
            <span>Real-time tracking</span>
            <span>|</span>
            <span>60-second Cancellation</span>
            <span>|</span>
            <span>Instant menu update</span>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/assets.svg"
            alt="Food Categories"
            width={574}
            height={631}
            className="h-auto"
            priority
          />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-100 rounded-full -z-10" />
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-100 rounded-full -z-10" />
        </div>
      </div>
    </section>
  )
}