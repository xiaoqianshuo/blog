'use client'

import { useState } from 'react'
import PostCard from './post-card'
import type { Post } from '@/lib/blog-data'

const categories = ['全部', '技术', '生活', '随笔'] as const
type Category = typeof categories[number]

export default function BlogFilter({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [active, setActive] = useState<Category>('全部')

  const filtered = active === '全部'
    ? posts
    : posts.filter((p) => p.category === active)

  return (
    <>
      {/* Category Filter */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        {categories.map((cat) => {
          const isActive = cat === active
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                padding: '0.35rem 1rem',
                borderRadius: '100px',
                cursor: 'pointer',
                background: isActive ? 'var(--accent)' : 'var(--bg-subtle)',
                color: isActive ? 'var(--text-on-accent)' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '3rem',
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              padding: '0.2rem 0.6rem',
              letterSpacing: '0.02em',
            }}
          >
            # {tag}
          </span>
        ))}
      </div>

      {/* Posts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map((post, i) => (
            <div
              key={post.slug}
              style={{
                opacity: 0,
                animation: `fadeUp 0.45s ease ${0.08 * i + 0.1}s forwards`,
              }}
            >
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </>
  )
}
