'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
// import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const { user, logout } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Calling logout api 
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {

      router.push('/login');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  };
  }

  if (isLoading) {
   return (
    <div>
      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
    </div> 
   ) 
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-gray-200 hover:border-primary-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary-2/10 flex items-center justify-center">
          <span className="text-primary-2 font-semibold">
          <Image
                src="/assets/images/chef/modiji.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
          </span>
        </div>
        {/* <span className="text-neutral font-medium">{user?.name || 'User'}</span> */}
        <ChevronDown
          size={20}
          className={`text-neutral/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            {/* <p className="text-sm font-medium text-neutral">{user?.name}</p>
            <p className="text-xs text-neutral/70">{user?.email}</p> */}
          </div>
          
          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/profile');
            }}
            className="w-full px-4 py-2 text-left text-sm text-neutral hover:bg-gray-50 flex items-center space-x-2"
          >
            <User size={16} />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/settings');
            }}
            className="w-full px-4 py-2 text-left text-sm text-neutral hover:bg-gray-50 flex items-center space-x-2"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
