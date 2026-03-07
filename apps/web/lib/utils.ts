export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${year} / ${month} / ${day}`;
}

export const categoryColor: Record<string, string> = {
  技术: 'var(--accent)',
  生活: 'var(--accent-warm)',
  随笔: 'var(--accent-muted)',
};

export const categoryBg: Record<string, string> = {
  技术: 'var(--tag-tech)',
  生活: 'var(--tag-life)',
  随笔: 'var(--tag-essay)',
};
