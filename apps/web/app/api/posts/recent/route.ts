import { Post } from '@xiaoqianshuo/types'
import { z } from 'zod'
import rawPosts from '@/data/posts.json'

// 启动时解析并校验 JSON 数据，确保数据结构符合 Post schema
const posts: Post[] = z.array(Post).parse(rawPosts)

/**
 * GET /api/posts/recent?n=4
 * 按发布日期降序返回最近 n 篇文章，n 默认为 4，最小为 1
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const n = Math.max(1, Number(searchParams.get('n') ?? 4))
  const recent = [...posts].sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, n)
  return Response.json(recent)
}
