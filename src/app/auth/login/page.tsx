"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/postcode");
  };

  return (
    <div className="min-h-screen flex ">
      <div className="w-1/2 p-8 flex flex-col">
        <div className="flex justify-start items-start">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-primary-2 text-5xl font-bold">sryzans</h1>
          </Link>
        </div>
        <div className="w-full ml-20 my-5 py-5 px-20">
          <h2 className="text-40 font-poppins font-semibold text-neutral mb-2">
            Login
          </h2>
          <p className="text-neutral/75 text-lg font-normal mb-8">
            Login to access your sryzans account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="john.doe@gmail.com"
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
                type={showPassword ? "text" : "password"}
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="text-[#666666]" /> : <Eye className="text-[#666666]" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-200 text-primary-2 focus:ring-primary-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-neutral">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-secondary-1"
              >
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-semibold text-secondary-1">
                Sign up
              </Link>
            </p>
          </div>

          {/* <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral">Or login with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <button className="flex justify-center items-center py-3 px-4 border border-primary-2 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/logo/facebook.svg" alt="Facebook" width={24} height={24} />
              </button>
              <button className="flex justify-center items-center py-3 px-4 border border-primary-2 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/logo/google.svg" alt="Google" width={24} height={24} />
              </button>
              <button className="flex justify-center items-center py-3 px-4 border border-primary-2 rounded-full hover:bg-gray-50">
                <Image src="/assets/images/logo/apple.svg" alt="apple" width={24} height={24} />
              </button>
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/login/login-bg.svg"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
