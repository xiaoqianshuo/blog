'use client'

import { useTheme, type Theme } from './theme-provider'

const themes: { id: Theme; label: string; dot: string }[] = [
  { id: 'sky',  label: '天蓝', dot: '#3B8EFF' },
  { id: 'jade', label: '苔绿', dot: '#7A9E7A' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: '100px',
        padding: '3px',
      }}
    >
      {themes.map((t) => {
        const active = theme === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={t.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              background: active ? 'var(--bg-card)' : 'transparent',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.04em',
              color: active ? 'var(--text)' : 'var(--text-light)',
              fontWeight: active ? 500 : 400,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: t.dot,
                flexShrink: 0,
                opacity: active ? 1 : 0.5,
                transition: 'opacity 0.2s',
              }}
            />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
