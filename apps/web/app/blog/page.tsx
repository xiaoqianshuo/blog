import type { Metadata } from 'next'
import PostCard from '@/components/post-card'
import { posts, getAllTags } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: '文章',
  description: '所有文章列表',
}

const categories = ['全部', '技术', '生活', '随笔'] as const

export default function BlogPage() {
  const allTags = getAllTags()

  return (
    <div
      style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '4rem 2rem 6rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '3rem',
          opacity: 0,
          animation: 'fadeUp 0.5s ease 0.1s forwards',
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
          All Articles
        </p>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          文章
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
          }}
        >
          共 {posts.length} 篇文章
        </p>
      </div>

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
        {categories.map((cat) => (
          <span
            key={cat}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              padding: '0.35rem 1rem',
              borderRadius: '100px',
              cursor: 'pointer',
              background: cat === '全部' ? 'var(--accent)' : 'var(--bg-subtle)',
              color: cat === '全部' ? '#fff' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: cat === '全部' ? 'var(--accent)' : 'var(--border)',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </span>
        ))}
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
        {allTags.map((tag) => (
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
        {posts
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
    </div>
  )
}
