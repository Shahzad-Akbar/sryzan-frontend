import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    setupAuthInterceptor(apiClient);
    const { orderId } = await context.params; // ✅ this is required in App Router

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const orderRes = await apiClient.get(`${API_ENDPOINTS.GET_ORDERS}/detail/${orderId}`);
    const order = orderRes.data;

    return NextResponse.json({
      message: `Received GET request for order ID: ${orderId}`,
      data: order,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    setupAuthInterceptor(apiClient);

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const newStatus = body.status ?? 'cancelled';

    const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_ORDER_STATUS}/${orderId}/status`, {
      status: newStatus,
    });

    return NextResponse.json({
      message: `Order status updated to '${newStatus}' for ID: ${orderId}`,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


