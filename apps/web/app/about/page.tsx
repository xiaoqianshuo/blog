import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于晓千烁',
}

const skills = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Engineering', items: ['Monorepo', 'pnpm', 'CI/CD', 'Testing'] },
  { label: 'Interests', items: ['骑行', '摄影', '阅读', '旅行'] },
]

export default function AboutPage() {
  return (
    <div className="max-w-270 mx-auto px-8 pt-16 pb-24">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(480px,1fr))] gap-16 items-start">
        {/* Left: Bio */}
        <div
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.1s forwards' }}
        >
          <p className="font-sans text-[0.72rem] tracking-[0.2em] text-accent uppercase mb-3">
            About Me
          </p>

          <h1 className="text-[2rem] font-bold tracking-[-0.02em] mb-8">
            关于我
          </h1>

          {/* Avatar placeholder */}
          <div className="w-18 h-18 rounded-full bg-accent-pale border-2 border-accent-mid flex items-center justify-center text-[1.75rem] mb-6">
            🌿
          </div>

          <div className="prose">
            <p>
              你好，我是<strong>晓千烁</strong>，一名前端开发者，同时也是个业余写作者。
            </p>
            <p>
              我相信好的代码和好的文章在本质上是相通的：都需要清晰的思维、精准的表达，以及对细节的持续打磨。
            </p>
            <p>
              平时喜欢骑行、摄影和读书。骑行让我在运动中清空大脑，摄影训练我的观察力，读书则是我和不同时代的人对话的方式。
            </p>
            <p>
              这个博客是我记录思考的地方。技术分享、生活随笔、年度总结，不设限，只要是想说的，就写下来。
            </p>
            <p>
              如果你对我的文章感兴趣，欢迎通过邮件联系：
              <a
                href="mailto:xiaoqianshuo@163.com"
                className="text-accent border-b border-accent-pale"
              >
                xiaoqianshuo@163.com
              </a>
            </p>
          </div>
        </div>

        {/* Right: Skills & Info */}
        <div
          className="flex flex-col gap-8"
          style={{ opacity: 0, animation: 'fadeUp 0.6s ease 0.25s forwards' }}
        >
          {/* Skills */}
          {skills.map((group) => (
            <div key={group.label}>
              <p className="font-sans text-[0.72rem] tracking-[0.15em] text-text-muted uppercase mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans text-[0.8rem] text-text bg-bg-subtle border border-border rounded-md py-[0.35rem] px-3 tracking-[0.02em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Quote */}
          <div className="mt-4 py-5 px-6 bg-bg-subtle rounded-[10px] border-l-[3px] border-accent-pale">
            <p className="font-serif text-[0.95rem] text-text-muted italic leading-[1.8] m-0">
              「时间是最好的编辑，
              <br />
              　而写作是最诚实的自我审视。」
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-[0.72rem] tracking-[0.15em] text-text-muted uppercase mb-3">
              Links
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'GitHub', href: 'https://github.com/xiaoqianshuo', icon: '⌥' },
                { label: 'Homepage', href: 'http://xiaoqianshuo.work', icon: '◎' },
                { label: 'Email', href: 'mailto:xiaoqianshuo@163.com', icon: '✉' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.85rem] text-text-muted flex items-center gap-2 py-2 border-b border-border-light transition-colors duration-200"
                >
                  <span className="text-accent text-[0.8rem]">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
