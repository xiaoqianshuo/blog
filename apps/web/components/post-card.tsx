'use client'

import Link from 'next/link'
import type { Post } from '@/lib/blog-data'
import { formatDateShort, categoryColor, categoryBg } from '@/lib/utils'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ display: 'block' }}>
      <article
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: featured ? '2rem' : '1.5rem',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-3px)'
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
          el.style.borderColor = 'var(--accent-pale)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.borderColor = 'var(--border)'
        }}
      >
        {/* Category indicator */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '100%',
            background: categoryColor[post.category] ?? 'var(--accent)',
            borderRadius: '12px 0 0 12px',
          }}
        />

        {/* Category + Date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: categoryColor[post.category] ?? 'var(--accent)',
              background: categoryBg[post.category] ?? 'var(--tag-tech)',
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              letterSpacing: '0.02em',
            }}
          >
            {formatDateShort(post.date)}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: featured ? '1.25rem' : '1.05rem',
            fontWeight: 600,
            lineHeight: 1.4,
            margin: 0,
            color: 'var(--text)',
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            margin: 0,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: featured ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer: tags + reading time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  padding: '0.1rem 0.45rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--text-light)',
            }}
          >
            {post.readingTime} 分钟阅读
          </span>
        </div>
      </article>
    </Link>
  )
}
