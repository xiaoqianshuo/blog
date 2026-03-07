import PostCard from '@/components/post-card'
import { postApi } from '@xiaoqianshuo/api-v1'
import { formatDateShort } from '@/lib/utils'
import Link from 'next/link'

export default async function Home() {
  const [featured, recent] = await Promise.all([
    postApi.getFeaturedPosts(),
    postApi.getRecentPosts(4),
  ])

  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="max-w-270 mx-auto px-8 pt-24 pb-20 flex flex-col items-center text-center gap-6">
        {/* Decorative top line */}
        <div
          className="flex items-center gap-[0.6rem]"
          style={{ opacity: 0, animation: 'fadeUp 0.5s ease 0.1s forwards' }}
        >
          <span className="w-8 h-px bg-accent-mid" />
          <span className="font-sans text-[0.72rem] tracking-[0.2em] text-accent uppercase">
            Personal Blog
          </span>
          <span className="w-8 h-px bg-accent-mid" />
        </div>

        <h1
          className="font-bold leading-[1.15] tracking-[-0.02em] m-0"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.2s forwards',
          }}
        >
          晓千烁
        </h1>

        <p
          className="font-sans text-base text-accent tracking-[0.2em] m-0"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.3s forwards' }}
        >
          Developer · Writer · Explorer
        </p>

        <p
          className="max-w-120 text-[1.05rem] text-text-muted leading-[1.9] m-0"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.4s forwards' }}
        >
          用代码描绘世界，用文字记录时光。
          <br />
          这里是技术与生活交汇的地方。
        </p>

        <div
          className="flex gap-4 mt-2"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.5s forwards' }}
        >
          <Link
            href="/blog"
            className="font-sans text-sm tracking-[0.06em] py-[0.7rem] px-7 bg-accent text-text-on-accent rounded-full font-medium transition-[background,transform] duration-200"
          >
            阅读文章
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm tracking-[0.06em] py-[0.7rem] px-7 bg-transparent text-text-muted border border-border rounded-full font-normal transition-[border-color,color] duration-200"
          >
            关于我
          </Link>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────── */}
      <div className="max-w-270 mx-auto px-8">
        <div className="border-t border-border-light" />
      </div>

      {/* ── Featured Posts ───────────────────────── */}
      <section className="max-w-270 mx-auto px-8 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-[1.15rem] font-semibold tracking-[-0.01em] m-0">
            精选文章
          </h2>
          <Link
            href="/blog"
            className="font-sans text-[0.8rem] text-accent tracking-[0.04em]"
          >
            全部文章 →
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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
      <section className="max-w-270 mx-auto px-8 pb-20">
        <h2 className="text-[1.15rem] font-semibold tracking-[-0.01em] mb-6">
          最近更新
        </h2>

        <div className="flex flex-col">
          {recent.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-baseline justify-between gap-4 py-[1.1rem] border-b border-border-light transition-colors duration-200"
              style={{
                opacity: 0,
                animation: `fadeIn 0.4s ease ${0.08 * i + 0.1}s forwards`,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pale border-[1.5px] border-accent-mid shrink-0" />
                <span className="text-[0.975rem] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {post.title}
                </span>
              </div>
              <span className="font-sans text-[0.76rem] text-text-light tracking-[0.02em] whitespace-nowrap shrink-0">
                {formatDateShort(post.date)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
