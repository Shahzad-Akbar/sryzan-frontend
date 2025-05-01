import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

export async function GET(req: NextRequest) {
  try {
    setupAuthInterceptor(apiClient);
    const cookies = req.cookies;
    const userId = cookies.get('userId')?.value; 

    const response = await apiClient.get(`${API_ENDPOINTS.GET_CART}/${userId}/items`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    setupAuthInterceptor(apiClient);
    const cookies = req.cookies;
    const userId = cookies.get('userId')?.value; // Assuming userId is stored in cookies
    const { menuItemId, quantity } = await req.json();

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

export async function DELETE(req: NextRequest) {
  try {
    setupAuthInterceptor(apiClient);
    const cookies = req.cookies;
    const userId = cookies.get('userId')?.value;
    
    const searchParams = req.nextUrl.searchParams;
    const cartItemId = searchParams.get('itemId');

    if (!userId || !cartItemId) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const response = await apiClient.delete(`${API_ENDPOINTS.REMOVE_FROM_CART}/${userId}/items/${cartItemId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}