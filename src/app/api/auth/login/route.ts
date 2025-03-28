import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function POST(request: Request) {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();

  const body = await request.json();
  const { email, password } = body;

  try {
    const res = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    const { user, accessToken, refreshToken } = res.data;

    cookieStore.set('token', accessToken, { maxAge: 900 });
    cookieStore.set('refreshToken', refreshToken, { maxAge: 604800 });

    if (user.role === 'admin') {
      cookieStore.set('admin', 'admin');
    }

    return NextResponse.json({ message: 'Logged in' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}
