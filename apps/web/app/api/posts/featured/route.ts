import { Post } from '@xiaoqianshuo/types'
import { z } from 'zod'
import rawPosts from '@/data/posts.json'

// 启动时解析并校验 JSON 数据，确保数据结构符合 Post schema
const posts: Post[] = z.array(Post).parse(rawPosts)

/**
 * GET /api/posts/featured
 * 返回标记为精选（featured: true）的文章列表
 */
export async function GET() {
  return Response.json(posts.filter((p) => p.featured === true))
}
