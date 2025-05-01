'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPageContent({ orderTotal, items, walletBalance }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null)

  const serviceCharge = 20.00
  const totalWithService = orderTotal + serviceCharge
  const isSufficientBalance = walletBalance >= totalWithService

  const handlePlaceOrder = async () => {
    if (!isSufficientBalance) return
    setLoading(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: 1,
          deliveryAddress: '123 Main St, City, State, ZIP',
          paymentMethod: 'upi',
        }),
      })

      if (!response.ok) throw new Error('Failed to place order')

      // ✅ Convert to blob and generate URL
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setInvoiceUrl(url)
      setShowSuccessPopup(true)
    } catch (error) {
      console.error('Error placing order:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-2 p-6">
          <h1 className="text-2xl font-bold text-white">Payment Checkout</h1>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {/* {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.MenuItem.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))} */}
          <div className="flex justify-between mt-4 font-medium">
            <span>Order Total:</span>
            <span>₹{orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 border-t pt-2">
            <span>Wallet Balance:</span>
            <span className={`font-semibold ${isSufficientBalance ? 'text-green-600' : 'text-red-600'}`}>
              ₹{walletBalance.toFixed(2)}
            </span>
          </div>
          {!isSufficientBalance && (
            <div className="p-3 bg-red-100 text-red-600 rounded mb-4">
              Insufficient wallet balance. Please add funds to proceed.
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={!isSufficientBalance || loading}
            className={`btn-primary w-full ${!isSufficientBalance ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          <Link href="/cart" className="block text-center mt-4 text-blue-500 hover:underline">
            Return to Cart
          </Link>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-xl max-w-md">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-green-600">Order Placed Successfully!</h3>
              <p className="text-sm mt-2">Thank you for your purchase!</p>
              <p className="text-sm text-gray-500 mt-1">Redirecting to orders...</p>
            </div>

            {invoiceUrl && (
              <a
                href={invoiceUrl}
                download="invoice.pdf"
                className="inline-block mt-4 btn-primary"
              >
                Download Invoice
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
