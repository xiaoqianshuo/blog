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
      <div className="flex gap-2 flex-wrap mb-10 pb-8 border-b border-border-light">
        {categories.map((cat) => {
          const isActive = cat === active
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-sans text-[0.8rem] py-[0.35rem] px-4 rounded-full cursor-pointer border tracking-[0.04em] transition-all duration-200 ${isActive ? 'bg-accent text-text-on-accent border-accent' : 'bg-bg-subtle text-text-muted border-border'}`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-[0.4rem] mb-12">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-sans text-[0.72rem] text-text-muted bg-bg-subtle border border-border-light rounded py-[0.2rem] px-[0.6rem] tracking-[0.02em]"
          >
            # {tag}
          </span>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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
