"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, resendVerificationEmail } = useAuthStore();
  const router = useRouter();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setFormError('Please enter your password');
      return;
    }

    await login(email, password);
    
    // Handle specific error cases
    if (error?.includes('not verified')) {
      setFormError('Please verify your email address before logging in.');
    } else if (error?.includes('Invalid credentials')) {
      setFormError('Invalid email or password. Please try again.');
    } else if (!error) {
      router.push('/dashboard');
    }
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

          {formError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 text-sm">{formError}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 text-sm">{error}</p>
              {error === 'Please verify your email first' && (
                <p className="mt-2 text-sm text-red-700">
                  Check your email for the verification link. Need a new link?{' '}
                  <button
                    type="button"
                    className="text-secondary-1 hover:underline"
                    onClick={async () => {
                      try {
                        await resendVerificationEmail(email);
                        alert('Verification email sent! Please check your inbox.');
                      } catch (error) {
                        console.error('Failed to resend verification email:', error);
                      }
                    }}
                  >
                    Resend verification email
                  </button>
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="john.doe@gmail.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={isLoading}
              className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
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
