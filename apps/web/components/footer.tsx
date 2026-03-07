import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-light bg-bg mt-24">
      <div className="max-w-270 mx-auto px-8 py-12 flex flex-col items-center gap-5">
        {/* Decorative */}
        <div className="flex items-center gap-3 text-accent-mid text-[1.1rem] tracking-[0.3em]">
          ·  ·  ·
        </div>

        <p
          className="font-sans text-[0.8rem] text-text-light tracking-[0.06em] m-0 text-center"
          suppressHydrationWarning
        >
          © {year} xiaoqianshuo &nbsp;·&nbsp; 用代码描绘世界，用文字记录时光
        </p>

        <div className="flex gap-6 font-sans text-[0.8rem]">
          {[
            { href: '/', label: '首页' },
            { href: '/blog', label: '文章' },
            { href: '/about', label: '关于' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-light transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[0.35rem] font-sans text-xs text-text-light no-underline tracking-[0.04em]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/beian.png" alt="备案图标" className="w-4 h-4" />
          赣ICP备20008842号-1
        </a>
      </div>
    </footer>
  )
}
