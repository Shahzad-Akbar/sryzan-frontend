import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import { setupAuthInterceptor } from "@/lib/api/interceptors/auth.interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        setupAuthInterceptor(apiClient);
        const cookies = req.cookies;
        const userId = cookies.get('userId')?.value; 

        // getting order id from route
        const orderId = req.url
    
        if (!userId) {
          return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }
    
        const response = await apiClient.get(`${API_ENDPOINTS.GET_ORDERS}/${userId}/`);
        console.log('Fetched orders:', response.data); // Log the fetched orders

        const orderId = response.data[0].id;

        // calling invoice generation api from backend
        const voiceResponse = await apiClient.get(`${API_ENDPOINTS.GENERATE_INVOICE}/${orderId}/invoice`);
        return NextResponse.json(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}