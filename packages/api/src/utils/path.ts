/**
 * 拼接多个路径片段
 * @param  {...string} parts 路径片段（第一个为基础URL）
 * @returns {string} 拼接后的URL
 */
export function joinMultiplePaths(...parts: string[]): string {
  if (parts.length === 0) return '';

  // 处理所有片段的首尾斜杠，再拼接
  const normalizedParts = parts
    .map(part => (part ? part.toString().replace(/(^\/+|\/+$)/g, '') : ''))
    .filter(part => part); // 过滤空片段

  return normalizedParts.join('/');
}
