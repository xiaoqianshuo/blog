'use client'

import { useTheme, type Mode, type Theme } from './theme-provider';

const themes: { id: Theme; label: string; dot: string }[] = [
  { id: 'jade',  label: '苔绿', dot: '#7A9E7A' },
  { id: 'sky',   label: '天蓝', dot: '#3B8EFF' },
  { id: 'rose',  label: '玫瑰', dot: '#C4616A' },
  { id: 'amber', label: '琥珀', dot: '#C4841E' },
  { id: 'dusk',  label: '暮色', dot: '#7B5EA7' },
  { id: 'ink',   label: '水墨', dot: '#C04040' },
]

const modes: { id: Mode; icon: string; label: string }[] = [
  { id: 'auto',  icon: '◑', label: '自动' },
  { id: 'light', icon: '○', label: '亮色' },
  { id: 'dark',  icon: '●', label: '暗色' },
]

export default function ThemeToggle() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <div className="flex items-center gap-1.5">
      {/* Theme palette switcher */}
      <div className="flex items-center gap-0.5 bg-bg-subtle border border-border rounded-full p-0.75">
        {themes.map((t) => {
          const active = theme === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              className={`flex items-center gap-1 px-2 py-0.75 rounded-full border-0 cursor-pointer transition-all duration-180 whitespace-nowrap ${active ? 'bg-bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}
            >
              <span
                className="inline-block w-1.75 h-1.75 rounded-full shrink-0 transition-opacity duration-180"
                style={{ background: t.dot, opacity: active ? 1 : 0.5 }}
              />
              {active && (
                <span className="text-text text-[0.72rem] tracking-[0.04em] font-medium">
                  {t.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border shrink-0" />

      {/* Mode switcher */}
      <div className="flex items-center gap-0.5 bg-bg-subtle border border-border rounded-full p-0.75">
        {modes.map((m) => {
          const active = mode === m.id
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              title={m.label}
              className={`flex items-center gap-1 px-2 py-0.75 rounded-full border-0 cursor-pointer transition-all duration-180 whitespace-nowrap ${active ? 'bg-bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}
            >
              <span className={`text-xs leading-none ${active ? 'text-accent' : 'text-text-light'}`}>
                {m.icon}
              </span>
              <span className={`text-[0.72rem] tracking-[0.04em] ${active ? 'text-text font-medium' : 'text-text-light font-normal'}`}>
                {m.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
