import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/app/constants/data'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-500">
          <Image 
              src="/sryzan.svg" 
              alt="sryzans" 
              width={150} 
              height={40} 
              className="h-6"
            />

          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-gray-600 hover:text-orange-500"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <Link href="/login">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}