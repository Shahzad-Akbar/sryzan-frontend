import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';

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
    // Make request to get all users for admin dashboard with pagination
    const res = await apiClient.get(`${API_ENDPOINTS.ADMIN_USERS}`, {
      params: { page, limit, search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return NextResponse.json({
      message: 'Users fetched',
      data: data.data,
      error: null,
    });
  } catch (error) {
    console.error('Error while fetching users:', error);
    return NextResponse.json(
      {
        message: 'Error while fetching users',
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

  // Get parameters from URL path
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('userId'); // This is fine if you are using query params
  if (!id) {
    return NextResponse.json(
      {
        message: 'User  ID is required',
        res: null,
        error: 'User  ID is required',
      },
      { status: 400 },
    );
  }

  // Get request body
  const body = await request.json();

  try {
    console.log(`${API_ENDPOINTS.ADMIN_UPDATE_USER}/${id}`); // Log the full URL
    // Make request to update user
    const res = await apiClient.patch(`${API_ENDPOINTS.ADMIN_UPDATE_USER}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return NextResponse.json({
      message: 'User  updated successfully',
      data: data,
      error: null,
    });
  } catch (error) {
    console.error('Error while updating user:', error);
    return NextResponse.json(
      {
        message: 'Error while updating user',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}

// Route to delete user by ID
export async function DELETE(request: Request) {
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

  // Get parameters from URL path
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('userId'); // This is fine if you are using query params
  if (!id) {
    return NextResponse.json(
      {
        message: 'User ID is required',
        res: null,
        error: 'User ID is required',
      },
      { status: 400 },
    );
  }

  try {
    // Make request to delete user
    const res = await apiClient.delete(`${API_ENDPOINTS.ADMIN_DELETE_USER}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;

    return NextResponse.json({
      message: 'User deleted successfully',
      data: data,
      error: null,
    });
  } catch (error) {
    console.error('Error while deleting user:', error);
    return NextResponse.json(
      {
        message: 'Error while deleting user',
        res: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 },
    );
  }
}
