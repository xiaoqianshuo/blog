'use client'

import type { Post } from '@xiaoqianshuo/types'
import { categoryBg, categoryColor, formatDateShort } from '@/lib/utils'
import Link from 'next/link'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article
        className={`bg-bg-card border border-border rounded-xl cursor-pointer h-full flex flex-col gap-3 relative overflow-hidden transition-[transform,box-shadow,border-color] duration-250 ${featured ? 'p-8' : 'p-6'}`}
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
          className="absolute top-0 left-0 w-0.75 h-full rounded-[12px_0_0_12px]"
          style={{ background: categoryColor[post.category] ?? 'var(--accent)' }}
        />

        {/* Category + Date */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-sans text-[0.7rem] font-medium tracking-[0.08em] py-[0.2rem] px-[0.6rem] rounded-full"
            style={{
              color: categoryColor[post.category] ?? 'var(--accent)',
              background: categoryBg[post.category] ?? 'var(--tag-tech)',
            }}
          >
            {post.category}
          </span>
          <span className="font-sans text-xs text-text-light tracking-[0.02em]">
            {formatDateShort(post.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className={`${featured ? 'text-xl' : 'text-[1.05rem]'} font-semibold leading-[1.4] m-0 text-text`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-sans text-sm text-text-muted leading-[1.75] m-0 flex-1 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: featured ? 3 : 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer: tags + reading time */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-wrap gap-[0.35rem]">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.7rem] text-text-muted bg-bg-subtle border border-border-light rounded py-[0.1rem] px-[0.45rem]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-sans text-[0.72rem] text-text-light">
            {post.readingTime} 分钟阅读
          </span>
        </div>
      </article>
    </Link>
  )
}
