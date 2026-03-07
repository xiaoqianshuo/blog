import ReadingProgress from '@/components/reading-progress'
import { categoryBg, categoryColor, formatDate } from '@/lib/utils'
import { postApi } from '@xiaoqianshuo/api-v1'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await postApi.listPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await postApi.getPost(slug);
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await postApi.getPost(slug);
  if (!post) notFound()

  return (
    <>
      <ReadingProgress />

      <article className="max-w-270 mx-auto px-8 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="font-sans text-[0.8rem] text-text-muted tracking-[0.04em] inline-flex items-center gap-[0.35rem] mb-10 transition-colors duration-200"
        >
          ← 返回文章列表
        </Link>

        {/* Article Header */}
        <header
          className="max-w-175 mb-12"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.05s forwards' }}
        >
          {/* Category */}
          <span
            className="font-sans text-[0.7rem] font-medium tracking-[0.08em] py-[0.2rem] px-[0.7rem] rounded-full inline-block mb-5"
            style={{
              color: categoryColor[post.category] ?? 'var(--accent)',
              background: categoryBg[post.category] ?? 'var(--tag-tech)',
            }}
          >
            {post.category}
          </span>

          <h1
            className="font-bold leading-tight tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 font-sans text-[0.8rem] text-text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="w-0.75 h-0.75 rounded-full bg-border inline-block" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[0.4rem] mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.72rem] text-text-muted bg-bg-subtle border border-border-light rounded py-[0.2rem] px-[0.55rem]"
              >
                # {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-175 border-t border-border-light mb-10" />

        {/* Article Content */}
        <div
          className="prose"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.2s forwards' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <div className="max-w-175 mt-16 pt-8 border-t border-border-light flex items-center justify-between">
          <Link
            href="/blog"
            className="font-sans text-[0.8rem] text-text-muted tracking-[0.04em]"
          >
            ← 返回文章列表
          </Link>
          <p className="font-sans text-xs text-text-light m-0">
            — xiaoqianshuo
          </p>
        </div>
      </article>
    </>
  )
}
