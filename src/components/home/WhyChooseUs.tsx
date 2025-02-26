import Image from 'next/image'

const features = [
  {
    id: 1,
    icon: '🛒',
    title: 'Online Order',
    description: 'Easy online ordering'
  },
  {
    id: 2,
    icon: '⏰',
    title: '24/7 Service',
    description: 'Available anytime'
  },
  {
    id: 3,
    icon: '⚡',
    title: '60-Sec. Cancellation',
    description: 'Quick cancellation'
  },
  {
    id: 4,
    icon: '💰',
    title: 'Within-a-Day Refund',
    description: 'Fast refund process'
  },
  {
    id: 5,
    icon: '📱',
    title: 'Instant Menu Updates',
    description: 'Real-time updates'
  },
  {
    id: 6,
    icon: '🧹',
    title: 'Clean Kitchen',
    description: 'Hygienic preparation'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16 bg-[#FDF8F4]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
        <div className="relative flex justify-center">
          <div className="relative rounded-full overflow-hidden w-[380px] h-[380px]">
            <Image
              src="/assets/images/temp/chefs.png"
              alt="Chef"
              width={665}
              height={594}
              className=""
            />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#E7FAE7] rounded-full -z-10" />
          <div className="absolute -left-4 -top-4 w-16 h-16 bg-[#FFE5CC] rounded-full -z-10" />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Why Choose Us? 😋
          </h2>
          <p className="text-neutral-2 mb-8 max-w-lg">
            Skip the hassle. Cancel orders in 60 seconds, enjoy same-day refunds, and 
            browse menus updated in real-time. Dining made delightful.our time matters. 
            That is why we guarantee instant cancellations, same-day refunds.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600">
            Order Now
          </button>
        </div>
      </div>
    </section>
  )
}