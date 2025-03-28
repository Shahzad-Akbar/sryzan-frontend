//  Create NextJS route for getting all users for admin dashboard with pagination from url query params
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api/config';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({
        'message: ': 'No token found',
        res: null,
        'Error:': 'No token found',
      });
    }
    // Get parameters from url query params
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    // Make request to get all users for admin dashboard with pagination
    const res = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN_USERS}?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = res.data;

    return NextResponse.json({
      'message: ': 'Users fetched',
      data: data.data,
      'Error:': null,
    });
  } catch (error) {
    return NextResponse.json({
      'message: ': 'Error while fetching users',
      res: null,
      'Error:': error,
    });
  }
}
