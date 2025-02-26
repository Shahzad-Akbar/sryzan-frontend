import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary-2">
              <Image 
                src="/logo-black.svg"
                alt="sryzans"
                width={184}
                height={44}
              />
            </Link>
            <p className="text-neutral mt-4">
              System is cuisine food ordering platform. Discover the best food and drinks.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral hover:text-primary-2">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral hover:text-primary-2">Contact Us</Link></li>
              <li><Link href="/services" className="text-neutral hover:text-primary-2">Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/partnership" className="text-neutral hover:text-primary-2">Partnership</Link></li>
              <li><Link href="/terms" className="text-neutral hover:text-primary-2">Terms of Use</Link></li>
              <li><Link href="/privacy" className="text-neutral hover:text-primary-2">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
            <p className="text-neutral">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="bg-primary-2 text-white px-6 py-2 rounded-lg mt-4">
              Contact Now
            </button>
          </div>
        </div>
        <div className="border-t mt-12 pt-6 text-center text-neutral">
          <p>Copyright © 2024 sryzans</p>
        </div>
      </div>
    </footer>
  )
}