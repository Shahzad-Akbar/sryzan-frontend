'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PostcodePage() {
  const router = useRouter()

  const handleClose = () => {
    router.push('/')
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-1/2 relative flex items-center justify-center bg-[#E6F7F5]">
        <div className="absolute top-0 left-0  bg-[#40E0D0]/10" />
        <Image
          src="/assets/images/postcode/rider.png"
          alt="Delivery Rider"
          width={500}
          height={400}
          className="w-full object-contain px-8"
          priority
        />
      </div>
      <div className="w-1/2 p-8 relative">
        <button 
          onClick={handleClose}
          className="absolute top-8 right-8 w-12 h-12 bg-[#37415F] rounded-full flex items-center justify-center hover:bg-neutral-2"
        >
          <Image
            src="/assets/images/postcode/close.png"
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        <div className="h-full flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">
            Please Enter Your{' '}
            <span className="border-b-4 border-orange-500">Post Code</span>
          </h1>
          
          <p className="text-neutral-2 mb-8 text-lg">
            To start placing delivery order, please enter your full postcode here
          </p>

          <div className="relative mb-12">
            <input
              type="text"
              placeholder="eg. AA1 1BB"
              className="w-full px-6 py-4 pr-32 rounded-full border border-neutral-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 text-lg font-medium">
              Find
            </button>
          </div>

          <div className="flex items-center gap-6 mb-12">
            <div className="h-[1px] bg-neutral-2 flex-1" />
            <span className="text-neutral-2 text-lg">or</span>
            <div className="h-[1px] bg-neutral-2 flex-1" />
          </div>

          <button className="flex items-center justify-center gap-3 text-neutral-2 hover:text-secondary-1 group">
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:border-secondary-1">
              <Image
                src="/assets/images/postcode/location.svg"
                alt="Location"
                width={24}
                height={24}
                className="group-hover:text-secondary-1"
              />
            </div>
            <span className="text-lg">I want to come and collect</span>
          </button>
        </div>
      </div>
    </div>
  )
}