import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function GET() {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    // Sending token to '/verify-email/:token' route to backend for verification of email
    const res = await apiClient.get(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${token}`);

    if (res.status !== 200) {
      return NextResponse.json({ error: 'Verification failed' }, { status: res.status });
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
