import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReadingProgress from '@/components/reading-progress'
import { getPostBySlug, posts } from '@/lib/blog-data'
import { formatDate, categoryColor, categoryBg } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ReadingProgress />

      <article
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '3rem 2rem 6rem',
        }}
      >
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '2.5rem',
            transition: 'color 0.2s',
          }}
        >
          ← 返回文章列表
        </Link>

        {/* Article Header */}
        <header
          style={{
            maxWidth: '700px',
            marginBottom: '3rem',
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.05s forwards',
          }}
        >
          {/* Category */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: categoryColor[post.category] ?? 'var(--accent)',
              background: categoryBg[post.category] ?? 'var(--tag-tech)',
              padding: '0.2rem 0.7rem',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '1.25rem',
            }}
          >
            {post.category}
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>{formatDate(post.date)}</span>
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'var(--border)',
                display: 'inline-block',
              }}
            />
            <span>{post.readingTime} 分钟阅读</span>
          </div>

          {/* Tags */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                }}
              >
                # {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div
          style={{
            maxWidth: '700px',
            borderTop: '1px solid var(--border-light)',
            marginBottom: '2.5rem',
          }}
        />

        {/* Article Content */}
        <div
          className="prose"
          style={{
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.2s forwards',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <div
          style={{
            maxWidth: '700px',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            ← 返回文章列表
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              margin: 0,
            }}
          >
            — xiaoqianshuo
          </p>
        </div>
      </article>
    </>
  )
}
