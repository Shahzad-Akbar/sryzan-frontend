'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
// Routes that should not be accessible when logged in
const publicOnlyRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password'];
// Routes that require admin role
const adminRoutes = ['/admin'];

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export function AuthMiddleware({ children }: AuthMiddlewareProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for hydration
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't perform redirects while loading

    // Check if it's an admin route
    if (adminRoutes.some(route => pathname?.startsWith(route))) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
      if (user?.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      return;
    }

    // Check if route requires authentication
    if (protectedRoutes.some(route => pathname?.startsWith(route))) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
    }

    // Check if route should not be accessible when logged in
    if (publicOnlyRoutes.some(route => pathname?.startsWith(route))) {
      if (isAuthenticated) {
        if (user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
        return;
      }
    }
  }, [pathname, isAuthenticated, user, router, isLoading]);

  if (isLoading) {
    // You can show a loading spinner here if you want
    return null;
  }

  return <>{children}</>;
}
