'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
    
    // After successful login, redirect to postcode page
    router.push('/postcode')
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="inline-block mb-8">
            <Image 
              src="/assets/images/login/Logo.svg"
              alt="sryzans"
              width={500}
              height={100}
              className="h-8 w-auto"
            />
          </Link>

          <h1 className="text-4xl font-poppins font-bold text-neutral mb-2">Login</h1>
          <p className="text-neutral/70 mb-8">Login to access your sryzans account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="john.doe@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                  👁️
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-500">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-2 text-neutral-white py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral/70">
              Do not have an account?{' '}
              <Link href="/signup" className="text-secondary-1 hover:opacity-90">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or login with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/login/facebook.png" alt="Facebook" width={24} height={24} />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/login/google.jpeg" alt="Google" width={24} height={24} />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/login/apple.png" alt="Apple" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-50">
        <Image
          src="/assets/images/login/login-bg.jpg"
          alt="Login background"
          width={787}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}