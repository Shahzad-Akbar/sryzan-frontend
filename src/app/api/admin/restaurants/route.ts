// Creating route for next js application for restaurants data

import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';
import { cookies } from 'next/headers';

interface RestaurantData {
  name: string;
  description: string;
  address: string;
  isActive: boolean;
}

export async function GET(request: Request) {
  await setupAuthInterceptor(apiClient);
  const cookieStore = await cookies();

  // Get token from cookie
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

  // Get parameters from URL query params
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1'; // Default to page 1
  const limit = searchParams.get('limit') || '10'; // Default to limit 10
  const search = searchParams.get('search') || ''; // Default to empty search

  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_GET_RESTAURANTS, {
      params: { page, limit, search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return NextResponse.json({
      message: 'Restaurants fetched successfully',
      data: data.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error fetching restaurants',
        res: null,
        error: error,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
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

  try {
    const restaurantData: RestaurantData = await request.json();
    console.log(restaurantData); // Log the restaurantData object to the termina

    const res = await apiClient.post(API_ENDPOINTS.ADMIN_CREATE_RESTAURANT, restaurantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Restaurant created successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error creating restaurant',
        res: null,
        error: error,
      },
      { status: 500 },
    );
  }
}
