import type { Metadata } from 'next'
import { Inter, Instrument_Serif, Barlow } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/context/LangContext'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })
const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})
const barlow = Barlow({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'SOLAI — Tự động hóa quy trình, giảm chi phí vận hành',
  description:
    'SOLAI giúp doanh nghiệp tự động hóa công việc lặp lại — nhập liệu, báo cáo, theo dõi khách hàng, duyệt quy trình. 9 sản phẩm đang chạy thật tại doanh nghiệp Việt.',
  keywords: ['tự động hóa', 'AI doanh nghiệp', 'phần mềm AI', 'Vietnam', 'SOLAI', 'automation'],
  openGraph: {
    title: 'SOLAI — Tự động hóa quy trình doanh nghiệp',
    description: 'Hàng nghìn giờ thủ công mỗi tháng — biến mất.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`h-full antialiased ${inter.variable} ${serif.variable} ${barlow.variable}`}>
      <body className="min-h-full" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
