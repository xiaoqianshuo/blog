export type ContentBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; text: string }
  | { type: 'ul'; items: string[] }

export interface Post {
  slug: string
  title: string
  date: string
  category: '技术' | '生活' | '随笔'
  tags: string[]
  excerpt: string
  content: ContentBlock[]
  readingTime: number
  featured?: boolean
}

export const posts: Post[] = [
  {
    slug: 'nextjs-server-components',
    title: 'React Server Components 深度解析',
    date: '2025-02-18',
    category: '技术',
    tags: ['Next.js', 'React', 'TypeScript'],
    excerpt:
      'Server Components 彻底改变了我们思考 React 应用的方式。深入探讨其工作原理与最佳实践。',
    readingTime: 8,
    featured: true,
    content: [
      { type: 'h2', text: '为什么 Server Components 如此重要' },
      {
        type: 'p',
        text: '在 React 的发展历程中，Server Components 可能是最具颠覆性的特性之一。它不仅仅是一个性能优化手段，更是对「组件」这一概念的重新思考。',
      },
      {
        type: 'p',
        text: '传统的 React 应用，无论是 CSR 还是 SSR，最终都需要将 JavaScript 代码下发到客户端执行。而 Server Components 则完全在服务端渲染，永远不会出现在客户端的 JavaScript bundle 中。',
      },
      { type: 'h2', text: '工作原理' },
      {
        type: 'p',
        text: '当用户请求一个页面时，服务端会执行 Server Components，生成一种特殊的序列化格式（RSC Payload），然后发送给客户端。客户端的 React 运行时接收这些数据，并将其渲染成 DOM。',
      },
      {
        type: 'code',
        text: `// Server Component（默认）
async function BlogPost({ slug }) {
  // 直接调用数据库，不会暴露给客户端
  const post = await db.posts.findBySlug(slug)
  return <article>{post.content}</article>
}`,
      },
      { type: 'h2', text: '何时使用 Client Components' },
      {
        type: 'p',
        text: 'Server Components 并非万能。以下情况必须使用 Client Components：',
      },
      {
        type: 'ul',
        items: [
          '需要使用 useState、useEffect 等 Hooks',
          '需要绑定浏览器事件（onClick、onChange 等）',
          '需要访问浏览器 API（localStorage、geolocation 等）',
        ],
      },
      { type: 'h2', text: '最佳实践：将客户端组件下推' },
      {
        type: 'p',
        text: '一个常见的模式是将需要交互的部分抽离为独立的 Client Component，而将数据获取逻辑保留在 Server Component 中。这样可以最大化服务端渲染的好处，同时保留必要的交互能力。',
      },
    ],
  },
  {
    slug: 'typescript-type-gymnastics',
    title: 'TypeScript 类型体操：优雅地驯服复杂类型',
    date: '2025-01-30',
    category: '技术',
    tags: ['TypeScript', '类型系统'],
    excerpt: '从条件类型到模板字面量类型，TypeScript 的类型系统远比大多数人想象的更强大。',
    readingTime: 6,
    featured: true,
    content: [
      { type: 'h2', text: '类型系统的哲学' },
      {
        type: 'p',
        text: 'TypeScript 的类型系统是图灵完备的——这意味着你可以用类型来「编程」。这既是它的魅力所在，也是某些代码让人头疼的原因。',
      },
      {
        type: 'p',
        text: '好的类型设计应当是描述性的，而非限制性的。当你感到在与类型系统「搏斗」时，往往意味着是时候重新思考设计了。',
      },
      { type: 'h2', text: '条件类型' },
      { type: 'p', text: '条件类型让我们可以根据类型关系进行分支：' },
      {
        type: 'code',
        text: `type IsArray<T> = T extends any[] ? true : false
// IsArray<string[]> → true
// IsArray<string>  → false`,
      },
      { type: 'h2', text: 'infer 关键字' },
      {
        type: 'p',
        text: 'infer 可以在条件类型中「推断」类型变量，这是许多工具类型的基础：',
      },
      {
        type: 'code',
        text: `type ReturnType<T> = 
  T extends (...args: any[]) => infer R 
    ? R 
    : never`,
      },
      { type: 'h2', text: '模板字面量类型' },
      {
        type: 'p',
        text: 'TypeScript 4.1 引入的模板字面量类型，让字符串类型操作变得异常强大。掌握这些工具类型之后，你会发现类型推导不再是负担，而是一种思维方式的延伸。',
      },
    ],
  },
  {
    slug: 'pnpm-monorepo-practice',
    title: 'Monorepo 实践：pnpm workspace 正确打开方式',
    date: '2025-01-12',
    category: '技术',
    tags: ['pnpm', 'Monorepo', '工程化'],
    excerpt: '基于真实项目经验，分享 pnpm workspace 在大型前端 Monorepo 中的最佳实践。',
    readingTime: 10,
    content: [
      { type: 'h2', text: '为什么选择 pnpm' },
      {
        type: 'p',
        text: '在尝试过 npm、yarn 和 lerna 之后，pnpm 成了我在 Monorepo 项目中的首选。其核心优势在于基于硬链接的 node_modules 结构，不仅节省磁盘空间，还能有效避免幽灵依赖问题。',
      },
      { type: 'h2', text: 'workspace 配置' },
      {
        type: 'code',
        text: `packages:
  - 'packages/*'
  - 'packages/config/*'
  - 'apps/*'`,
      },
      { type: 'h2', text: '内部包的版本策略' },
      {
        type: 'p',
        text: '使用 workspace:^ 协议引用内部包，这样在开发时直接使用本地代码，发布时自动替换为具体版本号。这是我认为 pnpm workspace 最优雅的设计之一。',
      },
    ],
  },
  {
    slug: 'kyoto-three-days',
    title: '京都三日：在古都寻找时间的褶皱',
    date: '2025-02-05',
    category: '生活',
    tags: ['旅行', '日本', '摄影'],
    excerpt: '三月的京都，樱花尚早，人群已散。走过千鸟居，在哲学之道的细雨中漫步。',
    readingTime: 5,
    featured: true,
    content: [
      { type: 'h2', text: '抵达' },
      {
        type: 'p',
        text: '从大阪坐 JR 快线，二十分钟便抵达京都。出站的那一刻，空气里带着一丝湿润，夹杂着不知名植物的清香。京都不像东京那样咄咄逼人，它的节奏是慢的，像一首被反复翻阅的旧诗。',
      },
      {
        type: 'p',
        text: '我住在祇园附近的一家町家民宿，格子窗透进来的光是橘黄色的，地板踩上去会发出细微的声响。',
      },
      { type: 'h2', text: '伏见稻荷' },
      {
        type: 'p',
        text: '清晨六点出发，是为了避开白天的游客。千鸟居在晨光里是橙红色的，绵延向山林深处，不知尽头在哪里。走了约三公里，人越来越少，鸟鸣越来越清晰。',
      },
      { type: 'h2', text: '哲学之道' },
      {
        type: 'p',
        text: '哲学之道因西田几多郎而得名，这位哲学家据说常在此散步思考。我在细雨里走完全程，没有想出什么深刻的哲学问题，但脑子里那些乱麻般的思绪，似乎被雨水冲淡了一些。',
      },
      {
        type: 'p',
        text: '也许这就是旅行的本质：不是寻找答案，而是短暂地让问题休息。',
      },
    ],
  },
  {
    slug: 'on-solitude-and-writing',
    title: '关于孤独与写作',
    date: '2025-01-20',
    category: '随笔',
    tags: ['写作', '思考', '生活'],
    excerpt: '写代码和写文章，在本质上是同一件事：将模糊的思维转化为精确的表达。',
    readingTime: 4,
    content: [
      {
        type: 'p',
        text: '我很晚才开始认真写作。在这之前，我觉得写作是一件需要「天赋」的事，而天赋这个词像一扇关闭的门，让我下意识地保持距离。',
      },
      {
        type: 'p',
        text: '后来发现，写作更像是一种体力活。你需要坐下来，把脑子里那些半透明的想法一个个捞起来，钉在纸上。有些想法一经文字就消散了，因为它们本来就只是幻觉；另一些则在书写中变得清晰。',
      },
      { type: 'h2', text: '孤独是必要条件' },
      {
        type: 'p',
        text: '好的写作需要孤独。不是那种绝望的孤独，而是主动选择的安静。在嘈杂中你只能写出嘈杂，内心的秩序是写作的先决条件。',
      },
      {
        type: 'p',
        text: '代码亦如此。最好的代码往往写于深夜，那时候世界缩小成屏幕的一方光，思维变得异常清晰，你和问题之间没有任何障碍。',
      },
      { type: 'h2', text: '写给未来的自己' },
      {
        type: 'p',
        text: '我开始把博客当作一种私密的公开日记。写下去的那些文字，一半是给可能读到它的人，另一半是给若干年后翻回来的自己。时间是最好的编辑。',
      },
    ],
  },
  {
    slug: '2024-annual-review',
    title: '2024 年度总结：在代码与生活之间',
    date: '2024-12-31',
    category: '随笔',
    tags: ['年终总结', '生活', '成长'],
    excerpt: '这一年，我学会了一些新技术，也失去了一些旧习惯。关于工作、创作和生活的年度回顾。',
    readingTime: 7,
    content: [
      { type: 'h2', text: '技术成长' },
      {
        type: 'p',
        text: '今年最大的收获是真正理解了「架构」这个词的含义。以前觉得架构是高深的概念，现在发现它不过是「为变化留出空间」的艺术。好的代码不是最聪明的代码，而是最容易被修改的代码。',
      },
      { type: 'h2', text: '生活碎片' },
      {
        type: 'p',
        text: '骑行了大概两千公里。大部分时候是独自上路，耳机里放着播客或者什么都不放，用身体的劳累换取大脑的清空。',
      },
      {
        type: 'p',
        text: '看了大约四十本书，其中最触动我的是《人生的智慧》。叔本华说，人生幸福的关键在于内心的宁静，而宁静来源于对欲望的节制。',
      },
      { type: 'h2', text: '2025 的关键词' },
      {
        type: 'p',
        text: '如果要给明年设定一个主题词，我会选「深入」。去年拓宽了很多边界，今年想在某几个方向上真正深下去。写下这些，不为宣誓，只是留个痕迹。',
      },
    ],
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured)
}

export function getRecentPosts(n = 4): Post[] {
  return [...posts].sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, n)
}

export function getAllTags(): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags)))
}

export function formatDateShort(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${year} / ${month} / ${day}`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
