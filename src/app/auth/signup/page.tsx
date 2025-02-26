import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-2/5 bg-primary-2/10 relative overflow-hidden">
        <Image
          src="/assets/images/signup/signup-bg.svg"
          alt="Signup background"
          width={576}
          height={1024}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
          priority
        />
      </div>
      <div className="w-3/5 px-10 py-8">
        <div className="flex justify-end">
          <Link href="/" className="inline-block mb-10">
            <Image
              src="/assets/images/login/Logo.svg"
              alt="sryzans"
              width={300}
              height={100}
              className="h-20 w-auto"
            />
          </Link>
        </div>
        <div className="w-full mx-5 px-20">
          <h1 className="text-40 font-poppins font-bold text-neutral mb-2">
            Sign up
          </h1>
          <p className="text-neutral/70 mb-8 text-base">
            Let&apos;s get you all set up so you can access your personal
            account.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  id="firstName"
                  className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
                />
                <label 
                  htmlFor="firstName" 
                  className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
                >
                  First Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
                  className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
                />
                <label 
                  htmlFor="lastName" 
                  className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  id="phone"
                  className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
                />
                <label 
                  htmlFor="phone" 
                  className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
              />
              <label 
                htmlFor="password" 
                className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                <Eye />
              </button>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                id="confirmPassword"
                className="w-full px-6 py-4 rounded-[32px] text-[#1C1B1F] placeholder:text-[#1C1B1F] border border-[#E5E7EB] focus:outline-none focus:border-primary-2 pt-4 pb-2"
              />
              <label 
                htmlFor="confirmPassword" 
                className="absolute left-6 top-0 text-sm text-[#1C1B1F] bg-white px-2 translate-y-[-50%]"
              >
                Confirm Password
              </label>
              <button
                type="button"
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                <Eye />
              </button>
            </div>

            <div className="flex items-center mt-6 ml-5">
              <input
                type="checkbox"
                id="terms"
                className="h-5 w-5 rounded border-neutral text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-neutral">
                I agree to all the{" "}
                <Link
                  href="/terms"
                  className="text-secondary-1 hover:text-secondary-1"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-secondary-1 hover:text-secondary-1"
                >
                  Privacy Policies
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
            >
              Create account
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-neutral/70">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-secondary-1 hover:text-secondary-1"
              >
                Login
              </Link>
            </p>
          </div>

          {/* <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral">
                  Or Sign up with
                </span>
              </div>
            </div> */}

            {/* <div className="mt-6 grid grid-cols-3 gap-4">
              <button className="flex justify-center items-center py-3 px-6 border border-neutral rounded-full hover:bg-neutral">
                <Image
                  src="/assets/images/logo/facebook.svg"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-neutral rounded-full hover:bg-neutral">
                <Image
                  src="/assets/images/logo/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-neutral rounded-full hover:bg-neutral">
                <Image
                  src="/assets/images/logo/apple.svg"
                  alt="Apple"
                  width={24}
                  height={24}
                />
              </button>
            </div> */}
          </div>
        </div>
      </div>
  );
}
