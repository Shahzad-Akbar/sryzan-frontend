'use client';

import { useEffect, useState } from 'react';
import CheckoutPageContent from './CheckoutPageContent';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckoutPageProps, CartItem } from '@/app/interfaces/checkout';

export function CheckoutPage({ orderTotal, items, walletBalance = 1200 }: CheckoutPageProps) {

  // State variables
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Calculate service charge
  const serviceCharge = 20.0;
  const totalWithService = orderTotal + serviceCharge;

  // Check if balance is sufficient
  const isSufficientBalance = walletBalance >= totalWithService;

  // Handle place order
  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccessPopup(true);
      console.log('✅ Order placed successfully, showing popup.');

      setTimeout(() => {
        console.log('➡️ Redirecting to /orders');
        window.location.href = '/orders';
      }, 2000);
    } catch (error) {
      console.error('❌ Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </Link>
        </div>

        <div className="bg-neutral-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-2 p-6">
            <h1 className="text-2xl font-bold text-white">Complete Your Order</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Order Summary Section */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b">
                      <div className="flex-shrink-0 w-16 h-16 bg-neutral-2 rounded-lg overflow-hidden relative">
                        <Image
                          src={`/assets/images/menu/${item.MenuItem.name}.jpg`}
                          alt={item.MenuItem.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/images/dishes/vegan-pizza.svg'; // Fallback image
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.MenuItem.name}</h3>
                        <p className="text-sm text-neutral/70">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-b">
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Subtotal</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Service Charge</span>
                    <span>₹{serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{totalWithService.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="md:col-span-1">
                <h2 className="text-xl font-semibold mb-6">Payment</h2>

                {/* Wallet Balance Card */}
                <div className="bg-primary-2 rounded-xl p-4 mb-6 relative overflow-hidden">
                  <Image
                    src="/assets/images/dashboard/bg-balance.svg"
                    alt="Background"
                    fill
                    className="object-cover"
                  />
                  <div className="relative z-10">
                    <h3 className="text-white mb-2">Your Balance</h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                      <span className="text-white text-xl font-bold">
                        ₹{walletBalance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Balance Status */}
                {!isSufficientBalance ? (
                  <div className="mb-6 p-4 bg-primary bg-opacity-10 rounded-lg border border-primary">
                    <p className="text-primary font-medium">Insufficient Balance</p>
                    <p className="text-sm text-primary/80 mt-1">
                      Please top up your wallet to complete this purchase.
                    </p>
                    <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg">
                      Top Up Wallet
                    </button>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-secondary-1 bg-opacity-10 rounded-lg border border-secondary-1">
                    <p className="text-secondary-1 font-medium">Sufficient Balance</p>
                    <p className="text-sm text-secondary-1/80 mt-1">
                      Your wallet has enough funds for this order.
                    </p>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!isSufficientBalance || loading}
                  className={`w-full bg-primary-2 text-white py-3 rounded-xl mb-4 flex items-center justify-center ${
                    !isSufficientBalance
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90 transition-opacity'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <Link href="/" className="block text-center text-neutral hover:text-primary">
                  Return to Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-secondary-1 bg-opacity-20 mb-4">
              <svg
                className="h-8 w-8 text-secondary-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral mb-2">Order Placed Successfully!</h3>
            <p className="text-sm text-neutral/70">
              Your order has been placed successfully. Thank you for your purchase!
            </p>
            <p className="text-sm text-neutral/70 mt-2">Redirecting to your orders...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPageWrapper() {
  const searchParams = useSearchParams();
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

        // Get wallet balance
        // const walletResponse = await fetch('/api/wallet')
        // if (walletResponse.ok) {
        //   const walletData = await walletResponse.json()
        //   setWalletBalance(walletData.balance)
        // }
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

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
