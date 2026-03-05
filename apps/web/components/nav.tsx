'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './theme-toggle'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '关于' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250, 250, 247, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <nav
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
          xiaoqianshuo
        </Link>

        {/* Nav Links + Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul
            style={{
              display: 'flex',
              gap: '2.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      letterSpacing: '0.04em',
                      color: active ? 'var(--accent)' : 'var(--text-muted)',
                      fontWeight: active ? 500 : 400,
                      transition: 'color 0.2s',
                      position: 'relative',
                    }}
                    className="nav-link"
                  >
                    {link.label}
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '1.5px',
                          background: 'var(--accent)',
                          borderRadius: '1px',
                        }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
