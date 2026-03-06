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
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {/* Theme palette switcher */}
      <div style={pillStyle}>
        {themes.map((t) => {
          const active = theme === t.id
          return (
            <button key={t.id} onClick={() => setTheme(t.id)} title={t.label} style={chipStyle(active)}>
              <span style={{ ...dotStyle, background: t.dot, opacity: active ? 1 : 0.5 }} />
              {active && (
                <span style={{ color: 'var(--text)', fontSize: '0.72rem', letterSpacing: '0.04em', fontWeight: 500 }}>
                  {t.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Mode switcher */}
      <div style={pillStyle}>
        {modes.map((m) => {
          const active = mode === m.id
          return (
            <button key={m.id} onClick={() => setMode(m.id)} title={m.label} style={chipStyle(active)}>
              <span style={{ fontSize: '0.75rem', color: active ? 'var(--accent)' : 'var(--text-light)', lineHeight: 1 }}>
                {m.icon}
              </span>
              <span style={{ color: active ? 'var(--text)' : 'var(--text-light)', fontSize: '0.72rem', letterSpacing: '0.04em', fontWeight: active ? 500 : 400 }}>
                {m.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const pillStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  background: 'var(--bg-subtle)',
  border: '1px solid var(--border)',
  borderRadius: '100px',
  padding: '3px',
}

function chipStyle(active: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '100px',
    border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--bg-card)' : 'transparent',
    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap' as const,
  }
}

const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  flexShrink: 0,
  transition: 'opacity 0.18s',
}
