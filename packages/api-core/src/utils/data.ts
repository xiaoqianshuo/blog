import z from 'zod';

/**
 * 解析 API 响应数据
 * @param data 响应结果对象
 * @param schema 用于解析响应数据的 Zod 模式
 * @returns 解析后的响应数据
 */
export function dataParse<T>(data: T, schema: z.ZodType<T>): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.issues.map(issue => issue.message);
    throw new Error(JSON.stringify(errors));
  }
  return parsed.data;
}
