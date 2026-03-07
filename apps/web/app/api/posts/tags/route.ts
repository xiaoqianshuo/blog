import { Post } from '@xiaoqianshuo/types'
import { z } from 'zod'
import rawPosts from '@/data/posts.json'

// 启动时解析并校验 JSON 数据，确保数据结构符合 Post schema
const posts: Post[] = z.array(Post).parse(rawPosts)

/**
 * GET /api/posts/tags
 * 返回所有文章的标签列表（去重后按首次出现顺序排列）
 */
export async function GET() {
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  return Response.json(tags)
}
