import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/constants/data'

export default function Navbar() {
  return (
    <nav className="bg-neutral-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between text-lg">
          <Link href="/" className="text-2xl font-bold text-primary-2">
            <Image 
              src="/sryzan.svg" 
              alt="sryzans" 
              width={184} 
              height={44} 
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-neutral hover:text-primary-2 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <Link href="/login">
            <button className="bg-primary-2 font-normal text-neutral-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}