import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'xiaoqianshuo',
    template: '%s · xiaoqianshuo',
  },
  description: '用代码描绘世界，用文字记录时光。一个关于技术与生活的个人博客。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={lora.variable}>
      <body>
        <ThemeProvider>
          <Nav />
          <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
