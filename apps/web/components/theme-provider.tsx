'use client'

import { createContext, useContext, useSyncExternalStore, useEffect } from 'react'

export type Theme = 'sky' | 'jade'
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

// Custom events to notify useSyncExternalStore when values change within the same tab
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

const getTheme  = (): Theme => { const v = localStorage.getItem(THEME_KEY); return v === 'sky' || v === 'jade' ? v : 'jade' }
const getMode   = (): Mode  => { const v = localStorage.getItem(MODE_KEY);  return v === 'light' || v === 'dark' || v === 'auto' ? v : 'auto' }
const ssrTheme  = (): Theme => 'jade'
const ssrMode   = (): Mode  => 'auto'

function resolveScheme(mode: Mode): 'light' | 'dark' {
  if (mode === 'light') return 'light'
  if (mode === 'dark')  return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyAttrs(theme: Theme, mode: Mode) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-scheme', resolveScheme(mode))
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore: server returns ssrTheme/ssrMode, client reads localStorage
  const theme = useSyncExternalStore(subscribe, getTheme, ssrTheme)
  const mode  = useSyncExternalStore(subscribe, getMode,  ssrMode)

  // Keep DOM attrs in sync
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
    window.dispatchEvent(new Event(EV_THEME))
    applyAttrs(t, mode)
  }

  const setMode = (m: Mode) => {
    localStorage.setItem(MODE_KEY, m)
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
