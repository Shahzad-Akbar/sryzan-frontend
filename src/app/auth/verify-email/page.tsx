'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch('/api/auth/verify-email');
        const data = await res.json();
        if (!res.ok) {
          setStatus('error');
          setMessage(data.message);
          return;
        }
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to verify email');
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-8 flex flex-col">
        <div className="flex justify-start items-start">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-primary-2 text-5xl font-bold">sryzans</h1>
          </Link>
        </div>
        <div className="w-full ml-20 my-5 py-5 px-20">
          <h2 className="text-40 font-poppins font-semibold text-neutral mb-2">
            Email Verification
          </h2>
          <div className="mt-8">
            {status === 'loading' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-2 mx-auto"></div>
                <p className="mt-4 text-neutral/75">Verifying your email...</p>
              </div>
            )}
            {status === 'success' && (
              <div className="rounded-[32px] bg-green-50 p-6 border border-green-200">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-primary-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-3 text-base font-medium text-neutral">{message}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-[32px] bg-red-50 p-6 border border-red-200">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-3 text-base font-medium text-neutral">{message}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="w-full bg-primary-2 text-neutral-white py-4 rounded-full hover:opacity-90 transition-opacity text-lg font-medium"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/login/login-bg.svg"
          alt="Verification background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
