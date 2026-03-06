'use client'

import { createContext, useContext, useSyncExternalStore, useEffect } from 'react'

export type Theme = 'sky' | 'jade' | 'rose' | 'amber' | 'dusk' | 'ink'
export type Mode  = 'auto' | 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  mode: Mode
  setTheme: (t: Theme) => void
  setMode: (m: Mode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'jade', mode: 'auto',
  setTheme: () => {}, setMode: () => {},
})

const THEME_KEY = 'blog-theme'
const MODE_KEY  = 'blog-mode'
const EV_THEME  = 'blog-theme-change'
const EV_MODE   = 'blog-mode-change'

function subscribe(cb: () => void) {
  window.addEventListener(EV_THEME, cb)
  window.addEventListener(EV_MODE,  cb)
  return () => {
    window.removeEventListener(EV_THEME, cb)
    window.removeEventListener(EV_MODE,  cb)
  }
}

const THEMES: Theme[] = ['sky', 'jade', 'rose', 'amber', 'dusk', 'ink']
const getTheme = (): Theme => { const v = localStorage.getItem(THEME_KEY); return THEMES.includes(v as Theme) ? v as Theme : 'jade' }
const getMode  = (): Mode  => { const v = localStorage.getItem(MODE_KEY);  return v === 'light' || v === 'dark' || v === 'auto' ? v : 'auto' }

function resolveScheme(mode: Mode): 'light' | 'dark' {
  if (mode === 'light') return 'light'
  if (mode === 'dark')  return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyAttrs(theme: Theme, mode: Mode) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-scheme', resolveScheme(mode))
  document.documentElement.setAttribute('data-mode', mode)
}

/** Keep theme + mode cookies in sync so server can SSR with correct values on next request */
function syncCookies(theme: Theme, mode: Mode) {
  document.cookie = `blog-theme=${theme};path=/;max-age=31536000;SameSite=Lax`
  document.cookie = `blog-mode=${mode};path=/;max-age=31536000;SameSite=Lax`
}

export function ThemeProvider({
  children,
  initialTheme = 'jade',
  initialMode  = 'auto',
}: {
  children: React.ReactNode
  initialTheme?: Theme
  initialMode?: Mode
}) {
  // Server snapshot uses cookie-derived initial values — matches server-rendered HTML exactly,
  // so useSyncExternalStore detects no mismatch and skips the re-render that caused the jump.
  const theme = useSyncExternalStore(subscribe, getTheme, () => initialTheme)
  const mode  = useSyncExternalStore(subscribe, getMode,  () => initialMode)

  // Keep DOM attrs in sync after client-side changes
  useEffect(() => { applyAttrs(theme, mode) }, [theme, mode])

  // Watch system preference when mode === 'auto'
  useEffect(() => {
    if (mode !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyAttrs(theme, mode)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme, mode])

  const setTheme = (t: Theme) => {
    localStorage.setItem(THEME_KEY, t)
    syncCookies(t, mode)
    window.dispatchEvent(new Event(EV_THEME))
    applyAttrs(t, mode)
  }

  const setMode = (m: Mode) => {
    localStorage.setItem(MODE_KEY, m)
    syncCookies(theme, m)
    window.dispatchEvent(new Event(EV_MODE))
    applyAttrs(theme, m)
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
