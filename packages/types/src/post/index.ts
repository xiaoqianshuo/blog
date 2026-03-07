import { z } from 'zod';

/**
 * 文章模型定义
 */
export const Post = z.object({
  slug: z.string().describe('文章唯一标识符'),
  title: z.string().describe('文章标题'),
  date: z.iso.date().describe('文章发布日期'),
  // date: z.string().refine(val => !isNaN(Date.parse(val)), {
  //   message: '无效的日期格式，必须为 ISO 8601 格式',
  // }).describe('文章发布日期'),
  category: z.enum(['技术', '生活', '随笔']).describe('文章分类'),
  tags: z.array(z.string()).describe('文章标签'),
  excerpt: z.string().describe('文章摘要'),
  content: z.string().describe('文章内容'),
  readingTime: z.number().int().positive().describe('预计阅读时间（分钟）'),
  featured: z.boolean().optional().describe('是否为精选文章'),
});

export type Post = z.infer<typeof Post>;
