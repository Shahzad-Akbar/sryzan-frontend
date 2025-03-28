'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoutPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
        router.push('/auth/login');
      }
    };

    performLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-8 flex flex-col">
        <div className="flex justify-start items-start">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-primary-2 text-5xl font-bold">sryzans</h1>
          </Link>
        </div>
        <div className="w-full ml-20 my-5 py-5 px-20">
          <h2 className="text-40 font-poppins font-semibold text-neutral mb-2">Logging Out</h2>
          <p className="text-neutral/75 text-lg font-normal mb-8">
            Please wait while we log you out...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-2"></div>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image
          src="/assets/images/login/login-bg.svg"
          alt="Logout background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
