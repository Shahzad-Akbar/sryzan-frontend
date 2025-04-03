import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

interface OrderData {
  userId: number;
  restaurantId: number;
  items: Array<{
    menuItemId: number;
    quantity: number;
  }>;
  status?: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
}

export async function GET(request: Request) {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json(
      {
        message: 'No token found',
        res: null,
        error: 'No token found',
      },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const status = searchParams.get('status');
  const restaurantId = searchParams.get('restaurantId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_GET_ORDERS, {
      params: { page, limit, status, restaurantId, startDate, endDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Orders fetched successfully',
      data: res.data.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error fetching orders',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      {
        message: 'Order ID is required',
        res: null,
        error: 'Order ID is required',
      },
      { status: 400 },
    );
  }

  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json(
      {
        message: 'No token found',
        res: null,
        error: 'No token found',
      },
      { status: 401 },
    );
  }

  try {
    const orderData: Partial<OrderData> = await request.json();
    const res = await apiClient.patch(`${API_ENDPOINTS.ADMIN_UPDATE_ORDER}/${orderId}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Order updated successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error updating order',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      {
        message: 'Order ID is required',
        res: null,
        error: 'Order ID is required',
      },
      { status: 400 },
    );
  }

  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json(
      {
        message: 'No token found',
        res: null,
        error: 'No token found',
      },
      { status: 401 },
    );
  }

  try {
    const res = await apiClient.delete(`${API_ENDPOINTS.ADMIN_DELETE_ORDER}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Order deleted successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error deleting order',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}
