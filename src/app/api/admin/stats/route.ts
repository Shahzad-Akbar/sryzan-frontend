//  Create NextJS route for admin dashboard stats
import { NextResponse } from 'next/server';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api/config';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({
        'message: ': 'No token found',
        res: null,
        'Error:': 'No token found',
      });
    }
    const dashboardStatsUrl = API_BASE_URL + API_ENDPOINTS.ADMIN_DASHBOARD_STATS;
    const res = await axios.get(dashboardStatsUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return NextResponse.json({
      'message: ': 'Dashboard stats fetched',
      data: data.data,
      'Error:': null,
    });
  } catch (error) {
    return NextResponse.json({
      'message: ': 'Error while fetching dashboard stats',
      res: null,
      'Error:': error,
    });
  }
}
