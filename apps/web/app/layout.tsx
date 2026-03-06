import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { cookies } from 'next/headers'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ThemeProvider, type Theme, type Mode } from '@/components/theme-provider'
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

const VALID_THEMES: Theme[] = ['sky', 'jade', 'rose', 'amber', 'dusk', 'ink']
const VALID_MODES:  Mode[]  = ['auto', 'light', 'dark']

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const rawTheme = cookieStore.get('blog-theme')?.value ?? ''
  const rawMode  = cookieStore.get('blog-mode')?.value  ?? ''
  const theme = (VALID_THEMES.includes(rawTheme as Theme) ? rawTheme : 'jade') as Theme
  const mode  = (VALID_MODES.includes(rawMode   as Mode)  ? rawMode  : 'auto') as Mode

  return (
    <html lang="zh-CN" className={lora.variable} data-theme={theme} data-scheme="light" data-mode={mode} suppressHydrationWarning>
      <head>
        {/* Resolve 'auto' mode → actual dark/light scheme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
(function(){try{
  var m=document.documentElement.getAttribute('data-mode')||'auto';
  var dark=m==='dark'||(m==='auto'&&window.matchMedia('(prefers-color-scheme:dark)').matches);
  document.documentElement.setAttribute('data-scheme',dark?'dark':'light');
}catch(e){}})();
        `}} />
      </head>
      <body>
        <ThemeProvider initialTheme={theme} initialMode={mode}>
          <Nav />
          <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
