import Image from 'next/image';
import { chefs } from '@/constants/data';

export default function PopularChef() {
  return (
    <section className="my-10 mb-28 mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Verified By Professionals</h2>

      <div className="flex justify-center md:grid-cols-3 gap-8">
        {chefs.map((chef) => (
          <div key={chef.id} className="relative group w-[400px] h-[400px]">
            <div className="bg-[#79d0a6] rounded-lg p-4 transition-all">
              <Image
                src={chef.image}
                alt={chef.name}
                width={200}
                height={200}
                className="w-full h-auto rounded-2xl"
              />
              <span className="absolute top-2 -left-0 bg-[#ff8500] text-white text-sm px-4 py-1.5 rounded-r-lg">
                Government Approved
              </span>
              <h3 className="text-xl font-semibold text-center mt-4">{chef.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
