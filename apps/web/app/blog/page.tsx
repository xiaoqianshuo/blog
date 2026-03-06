import type { Metadata } from 'next'
import BlogFilter from '@/components/blog-filter'
import { posts, getAllTags } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: '文章',
  description: '所有文章列表',
}

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

      <BlogFilter posts={[...posts]} tags={allTags} />
    </div>
  )
}
