import type { Metadata } from 'next'
import { Poppins, Open_Sans } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans'
})
export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Food Delivery`,
  description: 'Get delicious food delivered in minutes',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} font-open-sans`}>
        {children}
      </body>
    </html>
  )
}