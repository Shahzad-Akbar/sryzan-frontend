'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!formData.firstName.trim()) {
      setFormError('Please enter your first name');
      return;
    }
    if (!formData.lastName.trim()) {
      setFormError('Please enter your last name');
      return;
    }
    if (!formData.email) {
      setFormError('Please enter your email address');
      return;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!formData.password) {
      setFormError('Please enter a password');
      return;
    }
    // Password requirements: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      setFormError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (!formData.terms) {
      setFormError('Please accept the terms and conditions');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', res);

      if (res.status === 401) {
        setFormError('Invalid email or password');
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Handle specific error cases
      if (error?.includes('already exists')) {
        setFormError('An account with this email already exists');
      } else if (!error) {
        setStatus('success');
      }
    } catch (err) {
      setFormError(error || 'Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
          {status === 'success' ? (
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-primary-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <circle
                    className="opacity-25"
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M20.485 31.515l-7.07-7.071 2.828-2.829 4.242 4.243 10.606-10.607 2.829 2.828-13.435 13.436z"
                  />
                </svg>
              </div>
              <h2 className="text-40 font-poppins font-bold text-neutral mb-4">
                Registration Successful!
              </h2>
              <p className="text-neutral/70 text-lg mb-8">
                We've sent a verification email to{' '}
                <span className="font-semibold text-neutral">{formData.email}</span>
                .<br />
                Please check your inbox and click the verification link to activate your account.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
                >
                  Go to Login
                </button>
                <p className="text-sm text-neutral/70">
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    className="text-secondary-1 hover:underline"
                    onClick={async () => {
                      try {
                        await resendVerificationEmail(formData.email);
                        alert('Verification email sent! Please check your inbox.');
                      } catch (error) {
                        console.error('Failed to resend verification email:', error);
                      }
                    }}
                  >
                    Resend verification email
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-40 font-poppins font-bold text-neutral mb-2">Sign up</h1>
              <p className="text-neutral/70 mb-8 text-base">
                Let&apos;s get you all set up so you can access your personal account.
              </p>

              {(formError || error) && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded">
                  {formError || error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      id="firstName"
                      required
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
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      id="lastName"
                      required
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      id="email"
                      required
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    id="password"
                    required
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
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    id="confirmPassword"
                    required
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <div className="flex items-center mt-6 ml-5">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    id="terms"
                    className="h-5 w-5 rounded border-neutral text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-neutral">
                    I agree to all the{' '}
                    <Link href="/terms" className="text-secondary-1 hover:text-secondary-1">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-secondary-1 hover:text-secondary-1">
                      Privacy Policies
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-neutral/70">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-secondary-1 hover:text-secondary-1">
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
