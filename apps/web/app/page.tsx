import PostCard from '@/components/post-card'
import { getFeaturedPosts, getRecentPosts } from '@/lib/blog-data'
import { formatDateShort } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  const featured = getFeaturedPosts()
  const recent = getRecentPosts(4)

  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '6rem 2rem 5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Decorative top line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            opacity: 0,
            animation: 'fadeUp 0.5s ease 0.1s forwards',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--accent-mid)' }} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
            }}
          >
            Personal Blog
          </span>
          <span style={{ width: '32px', height: '1px', background: 'var(--accent-mid)' }} />
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.2s forwards',
          }}
        >
          晓千烁
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            margin: 0,
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.3s forwards',
          }}
        >
          Developer · Writer · Explorer
        </p>

        <p
          style={{
            maxWidth: '480px',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: 1.9,
            margin: 0,
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.4s forwards',
          }}
        >
          用代码描绘世界，用文字记录时光。
          <br />
          这里是技术与生活交汇的地方。
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '0.5rem',
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.5s forwards',
          }}
        >
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              padding: '0.7rem 1.75rem',
              background: 'var(--accent)',
              color: 'var(--text-on-accent)',
              borderRadius: '100px',
              fontWeight: 500,
              transition: 'background 0.2s, transform 0.2s',
            }}
          >
            阅读文章
          </Link>
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              padding: '0.7rem 1.75rem',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              fontWeight: 400,
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            关于我
          </Link>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────── */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div style={{ borderTop: '1px solid var(--border-light)' }} />
      </div>

      {/* ── Featured Posts ───────────────────────── */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            精选文章
          </h2>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              letterSpacing: '0.04em',
            }}
          >
            全部文章 →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {featured.map((post, i) => (
            <div
              key={post.slug}
              style={{
                opacity: 0,
                animation: `fadeUp 0.5s ease ${0.1 * i + 0.1}s forwards`,
              }}
            >
              <PostCard post={post} featured />
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Posts ─────────────────────────── */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '0 2rem 5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}
        >
          最近更新
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {recent.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1.1rem 0',
                borderBottom: '1px solid var(--border-light)',
                opacity: 0,
                animation: `fadeIn 0.4s ease ${0.08 * i + 0.1}s forwards`,
                transition: 'color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-pale)',
                    border: '1.5px solid var(--accent-mid)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.975rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.title}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  color: 'var(--text-light)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {formatDateShort(post.date)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
