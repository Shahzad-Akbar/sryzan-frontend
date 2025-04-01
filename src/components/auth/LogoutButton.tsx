'use client';

import { toast } from '../ui/use-toast';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      if (res.ok) {
        toast({
          title: 'Logout successful',
          description: 'You have been logged out successfully',
        });
      }
    } catch (error) {
      console.error(error);
    }
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
