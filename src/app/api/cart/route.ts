import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function POST(req: NextRequest) {
  try {
    setupAuthInterceptor(apiClient);
    const { userId, menuItemId, quantity } = await req.json();

    if (!userId || !menuItemId || !quantity) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const response = await apiClient.post(API_ENDPOINTS.ADD_TO_CART, {
      userId,
      menuItemId,
      quantity,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
