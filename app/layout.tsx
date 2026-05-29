import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistration from './_components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: '今日の料理',
  description: '家にある食材からレシピを探すアプリ',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '今日の料理',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full" style={{ fontFamily: "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif" }}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
