// Route for resending verification email for my next js application which send request to backend api
import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function POST(request: Request) {
  await setupAuthInterceptor(apiClient);
  const { email } = await request.json();

  try {
    const res = await apiClient.post(API_ENDPOINTS.RESEND_VERIFICATION, { email });

    if (res.status !== 200) {
      return NextResponse.json(
        { error: 'Resend email for verification failed' },
        { status: res.status },
      );
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ error: 'Resend Email failed' }, { status: 500 });
  }
}
