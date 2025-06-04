import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { setupAuthInterceptor } from '@/lib/api/interceptors/auth.interceptor';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        setupAuthInterceptor(apiClient);
        const cookies = req.cookies;
        const userId = cookies.get('userId')?.value; 
    
        if (!userId) {
          return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }
    
        const response = await apiClient.get(`${API_ENDPOINTS.GET_ORDERS}/${userId}`);
        console.log('Fetched orders:', response.data); // Log the fetched orders

        // const orderId = response.data[0].id;

        // calling invoice generation api from backend
        // const voiceResponse = await apiClient.get(`${API_ENDPOINTS.GENERATE_INVOICE}/${orderId}/invoice`);
        return NextResponse.json(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}

export async function POST(req: NextRequest) {
  try {
    setupAuthInterceptor(apiClient);
    const cookies = req.cookies;
    const userId = cookies.get('userId')?.value;
    const { restaurantId, deliveryAddress, paymentMethod } = await req.json();

    if (!userId || !restaurantId || !deliveryAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Step 1: Create the order
    const orderResponse = await apiClient.post(`${API_ENDPOINTS.CREATE_ORDER}/${userId}`, {
      restaurantId,
      deliveryAddress,
      paymentMethod,
    });

    const orderData = orderResponse.data;
    const orderId = orderData.id;

    // Step 2: Call invoice API
    const invoiceResponse = await apiClient.get(`${API_ENDPOINTS.GENERATE_INVOICE}/${orderId}/invoice`, {
      responseType: 'arraybuffer', // If PDF is binary
    });

    // Step 3: Return the PDF as a blob
    return new NextResponse(invoiceResponse.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="invoice.pdf"',
      },
    });
  } catch (error) {
    console.error('Error placing order or generating invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


