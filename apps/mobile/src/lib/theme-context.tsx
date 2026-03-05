'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Platform } from 'react-native'
import { themes, skyTheme, type ThemeName, type ThemeColors } from './themes'

interface ThemeContextValue {
  themeName: ThemeName
  colors: ThemeColors
  setTheme: (name: ThemeName) => void
  fonts: { serif: string | undefined; sans: string | undefined; mono: string }
}

const fonts = {
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  sans: undefined as string | undefined,
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'sky',
  colors: skyTheme,
  setTheme: () => {},
  fonts,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('sky')

  const setTheme = (name: ThemeName) => setThemeName(name)

  return (
    <ThemeContext.Provider
      value={{ themeName, colors: themes[themeName], setTheme, fonts }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
