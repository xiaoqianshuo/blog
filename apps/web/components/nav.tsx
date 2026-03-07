'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from './theme-toggle'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '关于' },
]

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <header
      className="sticky top-0 z-50 bg-bg-nav backdrop-blur-md border-b border-border-light"
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
    >
      <nav className="max-w-270 mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[1.1rem] font-semibold tracking-[0.02em] text-text flex items-center gap-[0.4rem]"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          xiaoqianshuo
        </Link>

        {/* Desktop: Nav Links + Theme Toggle */}
        <div className="nav-desktop-only items-center gap-8">
          <ul className="flex gap-10 list-none m-0 p-0">
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link font-sans text-sm tracking-[0.04em] transition-colors duration-200 relative ${active ? 'text-accent font-medium' : 'text-text-muted font-normal'}`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent rounded-[1px]" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: Hamburger */}
        <button
          className="nav-mobile-only items-center justify-center w-9 h-9 bg-transparent border border-border rounded-lg cursor-pointer text-text-muted text-base leading-none shrink-0 transition-colors duration-200"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="nav-mobile-only flex-col border-t border-border-light bg-bg-nav backdrop-blur-md pt-2 px-5 pb-5"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
        >
          {/* Nav Links */}
          <ul className="list-none m-0 p-0">
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between font-sans text-[0.95rem] tracking-[0.04em] py-[0.85rem] border-b border-border-light ${active ? 'text-accent font-medium' : 'text-text-muted font-normal'}`}
                  >
                    {link.label}
                    {active && (
                      <span className="w-1.25 h-1.25 rounded-full bg-accent shrink-0" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Theme Toggle — scrollable if needed */}
          <div
            className="mt-4 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
