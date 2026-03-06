import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { Platform, useColorScheme, View } from 'react-native'
import { vars } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { allThemes, getThemeColors, type ColorScheme, type ThemeColors, type ThemeName } from './themes'

const STORAGE_KEY_THEME = '@theme_name'
const STORAGE_KEY_MODE = '@display_mode'

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

/** Build a NativeWind CSS-variable style from a ThemeColors object */
function buildVars(colors: ThemeColors) {
  return vars({
    '--color-bg':           colors.bg,
    '--color-bg-card':      colors.bgCard,
    '--color-bg-subtle':    colors.bgSubtle,
    '--color-text':         colors.text,
    '--color-text-muted':   colors.textMuted,
    '--color-text-light':   colors.textLight,
    '--color-accent':       colors.accent,
    '--color-accent-mid':   colors.accentMid,
    '--color-accent-pale':  colors.accentPale,
    '--color-accent-deep':  colors.accentDeep,
    '--color-accent-warm':  colors.accentWarm,
    '--color-accent-muted': colors.accentMuted,
    '--color-border':       colors.border,
    '--color-border-light': colors.borderLight,
    '--color-tag-tech':     colors.tagTech,
    '--color-tag-life':     colors.tagLife,
    '--color-tag-essay':    colors.tagEssay,
  })
}

const defaultColors = allThemes.jade.light

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'jade',
  mode: 'auto',
  effectiveScheme: 'light',
  colors: defaultColors,
  setTheme: () => {},
  setMode: () => {},
  fonts,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme()
  const [themeName, setThemeName] = useState<ThemeName>('jade')
  const [mode, setModeState] = useState<DisplayMode>('auto')

  // Load persisted settings on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_THEME).then(v => { if (v) setThemeName(v as ThemeName) })
    AsyncStorage.getItem(STORAGE_KEY_MODE).then(v => { if (v) setModeState(v as DisplayMode) })
  }, [])

  const setTheme = (name: ThemeName) => {
    setThemeName(name)
    AsyncStorage.setItem(STORAGE_KEY_THEME, name)
  }

  const setMode = (m: DisplayMode) => {
    setModeState(m)
    AsyncStorage.setItem(STORAGE_KEY_MODE, m)
  }

  const effectiveScheme: ColorScheme =
    mode === 'auto' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode

  const colors = getThemeColors(themeName, effectiveScheme)

  return (
    <ThemeContext.Provider value={{
      themeName, mode, effectiveScheme, colors,
      setTheme, setMode, fonts,
    }}>
      {/* Inject CSS variables — all NativeWind className refs auto-resolve */}
      <View style={[{ flex: 1 }, buildVars(colors)]}>
        {children}
      </View>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
