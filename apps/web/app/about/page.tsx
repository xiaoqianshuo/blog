import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于晓千烁',
}

const skills = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Engineering', items: ['Monorepo', 'pnpm', 'CI/CD', 'Testing'] },
  { label: 'Interests', items: ['骑行', '摄影', '阅读', '旅行'] },
]

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '4rem 2rem 6rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Bio */}
        <div
          style={{
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.1s forwards',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            About Me
          </p>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            关于我
          </h1>

          {/* Avatar placeholder */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--accent-pale)',
              border: '2px solid var(--accent-mid)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
            }}
          >
            🌿
          </div>

          <div className="prose">
            <p>
              你好，我是<strong>晓千烁</strong>，一名前端开发者，同时也是个业余写作者。
            </p>
            <p>
              我相信好的代码和好的文章在本质上是相通的：都需要清晰的思维、精准的表达，以及对细节的持续打磨。
            </p>
            <p>
              平时喜欢骑行、摄影和读书。骑行让我在运动中清空大脑，摄影训练我的观察力，读书则是我和不同时代的人对话的方式。
            </p>
            <p>
              这个博客是我记录思考的地方。技术分享、生活随笔、年度总结，不设限，只要是想说的，就写下来。
            </p>
            <p>
              如果你对我的文章感兴趣，欢迎通过邮件联系：
              <a
                href="mailto:xiaoqianshuo@163.com"
                style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-pale)' }}
              >
                xiaoqianshuo@163.com
              </a>
            </p>
          </div>
        </div>

        {/* Right: Skills & Info */}
        <div
          style={{
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.25s forwards',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Skills */}
          {skills.map((group) => (
            <div key={group.label}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                {group.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--text)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Quote */}
          <div
            style={{
              marginTop: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-subtle)',
              borderRadius: '10px',
              borderLeft: '3px solid var(--accent-pale)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              「时间是最好的编辑，
              <br />
              　而写作是最诚实的自我审视。」
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Links
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/xiaoqianshuo', icon: '⌥' },
                { label: 'Homepage', href: 'http://xiaoqianshuo.work', icon: '◎' },
                { label: 'Email', href: 'mailto:xiaoqianshuo@163.com', icon: '✉' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'color 0.2s',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
