import Image from 'next/image'
import { chefs } from '@/constants/data'

export default function PopularChef() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Popular Chef
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {chefs.map((chef) => (
          <div key={chef.id} className="relative group">
            <div className="bg-[#DEFFFF] rounded-lg p-4 transition-all group-hover:bg-[#FFEBEB]">
              <Image
                src={chef.image}
                alt={chef.name}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-xl font-semibold text-center mt-4">{chef.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}