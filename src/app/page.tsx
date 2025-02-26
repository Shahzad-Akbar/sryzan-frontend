import Hero from '@/components/home/Hero'
import WhatsCooking from '@/components/home/WhatsCooking'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import MenuSection from '@/components/home/MenuSection'
import PopularChef from '@/components/home/PopularChef'
import Footer from '@/components/shared/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-white">
      <Hero />
      <WhatsCooking />
      <WhyChooseUs />
      <MenuSection />
      <PopularChef />
      <Footer />
    </main>
  )
}