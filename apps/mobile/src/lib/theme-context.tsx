import { createContext, useContext, useState, type ReactNode } from 'react'
import { Platform, useColorScheme } from 'react-native'
import { getThemeColors, skyTheme, type ColorScheme, type ThemeColors, type ThemeName } from './themes'

export type DisplayMode = 'auto' | 'light' | 'dark'

interface ThemeContextValue {
  themeName: ThemeName
  mode: DisplayMode
  effectiveScheme: ColorScheme
  colors: ThemeColors
  setTheme: (name: ThemeName) => void
  setMode: (m: DisplayMode) => void
  fonts: { serif: string | undefined; sans: string | undefined; mono: string }
}

const fonts = {
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  sans: undefined as string | undefined,
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'jade',
  mode: 'auto',
  effectiveScheme: 'light',
  colors: skyTheme,
  setTheme: () => {},
  setMode: () => {},
  fonts,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme()
  const [themeName, setThemeName] = useState<ThemeName>('sky')
  const [mode, setModeState] = useState<DisplayMode>('auto')

  const effectiveScheme: ColorScheme =
    mode === 'auto' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode

  const setTheme = (name: ThemeName) => setThemeName(name)
  const setMode  = (m: DisplayMode)  => setModeState(m)

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        mode,
        effectiveScheme,
        colors: getThemeColors(themeName, effectiveScheme),
        setTheme,
        setMode,
        fonts,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
