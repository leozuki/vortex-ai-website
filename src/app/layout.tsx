import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/context/LangContext'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: 'Vortex AI — Where Ideas Accelerate',
  description:
    'Vortex AI xây dựng các sản phẩm phần mềm AI thông minh cho doanh nghiệp — từ hệ thống đa tác nhân, pipeline dữ liệu đến nền tảng quản lý.',
  keywords: ['AI', 'automation', 'Vietnam', 'software', 'enterprise', 'Vortex AI'],
  openGraph: {
    title: 'Vortex AI',
    description: 'Where Ideas Accelerate',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className={`${inter.className} min-h-full`}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
