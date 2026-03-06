import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-light)',
        background: 'var(--bg)',
        marginTop: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {/* Decorative */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--accent-mid)',
            fontSize: '1.1rem',
            letterSpacing: '0.3em',
          }}
        >
          ·  ·  ·
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: 'var(--text-light)',
            letterSpacing: '0.06em',
            margin: 0,
            textAlign: 'center',
          }}
          suppressHydrationWarning
        >
          © {year} xiaoqianshuo &nbsp;·&nbsp; 用代码描绘世界，用文字记录时光
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
          }}
        >
          {[
            { href: '/', label: '首页' },
            { href: '/blog', label: '文章' },
            { href: '/about', label: '关于' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: 'var(--text-light)', transition: 'color 0.2s' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/beian.png" alt="备案图标" style={{ width: '16px', height: '16px' }} />
          赣ICP备20008842号-1
        </a>
      </div>
    </footer>
  )
}
