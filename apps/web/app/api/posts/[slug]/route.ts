import { Post } from '@xiaoqianshuo/types'
import { z } from 'zod'
import rawPosts from '@/data/posts.json'

// 启动时解析并校验 JSON 数据，确保数据结构符合 Post schema
const posts: Post[] = z.array(Post).parse(rawPosts)

/**
 * GET /api/posts/:slug
 * 根据 slug 返回单篇文章，不存在时返回 404
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return Response.json({ message: 'Post not found' }, { status: 404 })
  }
  return Response.json(post)
}
