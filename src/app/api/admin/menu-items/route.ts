import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

interface MenuItemData {
  name: string;
  description?: string;
  price: number;
  category: string;
  restaurantId: number;
  isAvailable?: boolean;
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
  const search = searchParams.get('search') || '';
  const restaurantId = searchParams.get('restaurantId');

  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_GET_MENU, {
      params: { page, limit, search, restaurantId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Menu items fetched successfully',
      data: res.data.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error fetching menu items',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
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
    const menuItemData: MenuItemData = await request.json();
    console.log(menuItemData);
    const res = await apiClient.post(API_ENDPOINTS.ADMIN_CREATE_MENU_ITEM, menuItemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Menu item created successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error creating menu item',
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
  const menuItemId = searchParams.get('menuItemId');

  if (!menuItemId) {
    return NextResponse.json(
      {
        message: 'Menu item ID is required',
        res: null,
        error: 'Menu item ID is required',
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
    const menuItemData: Partial<MenuItemData> = await request.json();
    const res = await apiClient.patch(
      `${API_ENDPOINTS.ADMIN_UPDATE_MENU_ITEM}/${menuItemId}`,
      menuItemData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json({
      message: 'Menu item updated successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error updating menu item',
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
  const menuItemId = searchParams.get('menuItemId');

  if (!menuItemId) {
    return NextResponse.json(
      {
        message: 'Menu item ID is required',
        res: null,
        error: 'Menu item ID is required',
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
    const res = await apiClient.delete(`${API_ENDPOINTS.ADMIN_DELETE_MENU_ITEM}/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({
      message: 'Menu item deleted successfully',
      data: res.data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error deleting menu item',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}
