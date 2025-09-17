import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import CursorMotion from '@/components/CursorMotion'
import BackgroundMotion from '@/components/BackgroundMotion'
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Should I buy it?',
  description: 'A simple interest calculator app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          margin: 0,
        }}>
        <Navbar />
        <CursorMotion />
        <BackgroundMotion />
        <main className="p-6"><NextIntlClientProvider>{children}</NextIntlClientProvider></main>
        <Footer />
      </body>
    </html>
  )
}
