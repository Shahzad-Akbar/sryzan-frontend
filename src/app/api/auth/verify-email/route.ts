import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function GET(request: Request) {
  await setupAuthInterceptor(apiClient);

  // Extract the token from the URL query parameters
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token not found' }, { status: 400 });
  }

  try {
    // Sending token to '/verify-email/:token' route to backend for verification of email
    const res = await apiClient.get(`${API_ENDPOINTS.VERIFY_EMAIL}/${token}`);

    if (res.status !== 200) {
      return NextResponse.json({ error: 'Verification failed' }, { status: res.status });
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
