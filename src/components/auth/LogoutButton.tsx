'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-semibold text-secondary-1 hover:opacity-80"
    >
      Logout
    </button>
  );
}
