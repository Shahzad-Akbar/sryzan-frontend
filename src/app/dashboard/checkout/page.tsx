'use client';

import { useEffect, useState } from 'react';
import CheckoutPageContent from './CheckoutPageContent';
import {  CartItem } from '@/app/interfaces/checkout';

export default function CheckoutPageWrapper() {
  const [loading, setLoading] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);
  const walletBalance = 1200

  useEffect(() => {
    // Fetch cart items from API or use the ones passed in the URL
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cart');
        if (response.ok) {
          const data = await response.json();
          setOrderTotal(
            data.reduce(
              (total: number, item: CartItem) => total + parseFloat(item.price) * item.quantity,
              0,
            ),
          );
        } 

      } catch (error) {
        console.error('Error fetching checkout data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-2"></div>
      </div>
    );
  }

  return (
    <>
      <CheckoutPageContent
        orderTotal={orderTotal}
        walletBalance={walletBalance}
      />
    </>
  );
}
