import BlogFilter from '@/components/blog-filter';
import { postApi } from '@xiaoqianshuo/api-v1';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文章',
  description: '所有文章列表',
}

export default async function BlogPage() {

  const posts = await postApi.listPosts();
  const allTags = await postApi.getAllTags()

  return (
    <div className="max-w-270 mx-auto px-8 pt-16 pb-24">
      {/* Header */}
      <div
        className="mb-12"
        style={{ opacity: 0, animation: 'fadeUp 0.5s ease 0.1s forwards' }}
      >
        <p className="font-sans text-[0.72rem] tracking-[0.2em] text-accent uppercase mb-3">
          All Articles
        </p>
        <h1 className="text-[2rem] font-bold tracking-[-0.02em] m-0">
          文章
        </h1>
        <p className="font-sans text-sm text-text-muted mt-2">
          共 {posts.length} 篇文章
        </p>
      </div>

      <BlogFilter posts={[...posts]} tags={allTags} />
    </div>
  )
}
