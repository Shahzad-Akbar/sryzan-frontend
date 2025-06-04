import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    setupAuthInterceptor(apiClient);
    const { orderId } = await params;

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

export async function POST(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = await params;
    setupAuthInterceptor(apiClient);

    console.log('orserid', orderId);

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const newStatus = body.status ?? 'cancelled'; // fallback to "cancelled" if not provided

    // Call backend to update the order status
    const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_ORDER_STATUS}/${orderId}/status`, {
      status: newStatus,
    });

    return NextResponse.json({
      message: `Order status updated to '${newStatus}' for ID: ${orderId}`,
      data: response.data,
    });
  } catch (error: any) {
    console.error('Error updating order status:', error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data?.message || 'Internal Server Error' },
      { status: error?.response?.status || 500 },
    );
  }
}
