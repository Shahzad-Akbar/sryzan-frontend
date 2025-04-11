import { NextResponse } from 'next/server';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api/config';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({
        message: 'No token found',
        data: null,
        error: 'No token found',
      });
    }

    // Fetch Menu Items
    const fetchUrl = API_BASE_URL + API_ENDPOINTS.GET_MENU_ITEMS;
    console.log('Fetching menu items from:', fetchUrl);
    const res = await apiClient.get(fetchUrl);


    return NextResponse.json({
      message: 'Dashboard data fetched successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({
      message: 'Error fetching dashboard data',
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}