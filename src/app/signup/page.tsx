import Image from 'next/image'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-primary-2/10 relative overflow-hidden">
        <Image
          src="/assets/images/signup/signup-bg.png"
          alt="Signup background"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
          priority
        />
      </div>
      <div className="w-1/2 px-16 py-8">
        <div>
          <Link href="/" className="inline-block mb-16">
            <Image 
              src="/assets/images/login/Logo.svg"
              alt="sryzans"
              width={300}
              height={100}
              className="h-20 w-auto"
            />
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-poppins font-bold text-neutral mb-2">Sign up</h1>
            <p className="text-neutral/70 mb-8">Let&apos;s get you all set up so you can access your personal account.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2">
                    👁️
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2">
                    👁️
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-5 w-5 rounded border-gray-200 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                  I agree to all the{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-500">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-500">Privacy Policies</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral/70">
                Already have an account?{' '}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-500">Login</Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or Sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button className="flex justify-center items-center py-3 px-6 border border-gray-200 rounded-full hover:bg-gray-50">
                  <Image src="/assets/images/login/facebook.png" alt="Facebook" width={28} height={28} />
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
      </div>
    </div>
  )
}