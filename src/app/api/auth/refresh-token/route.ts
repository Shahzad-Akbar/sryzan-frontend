import { NextResponse } from 'next/server';

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function POST(request: Request) {
  await setupAuthInterceptor(apiClient);
  const body = await request.json();
  const { refreshToken } = body;

  try {
    const res = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });

    const { accessToken, newRefreshToken } = res.data;
    console.log('getting new token', accessToken, newRefreshToken);
    return NextResponse.json({
      message: 'Tokens refreshed',
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
