export type ThemeName = 'sky' | 'jade'
export type ColorScheme = 'light' | 'dark'

export interface ThemeColors {
  bg: string
  bgCard: string
  bgSubtle: string
  text: string
  textMuted: string
  textLight: string
  accent: string
  accentMid: string
  accentPale: string
  accentDeep: string
  accentWarm: string
  accentMuted: string
  border: string
  borderLight: string
  tagTech: string
  tagLife: string
  tagEssay: string
}

// ── Sky · Light ──────────────────────────────────
export const skyTheme: ThemeColors = {
  bg:          '#F4F9FE',
  bgCard:      '#FFFFFF',
  bgSubtle:    '#EAF4FF',
  text:        '#0E2340',
  textMuted:   '#4B6A87',
  textLight:   '#8AAFC9',
  accent:      '#3B8EFF',
  accentMid:   '#74C0FF',
  accentPale:  '#D6F2FF',
  accentDeep:  '#2D7DFF',
  accentWarm:  '#FF8A4C',
  accentMuted: '#9B8FFF',
  border:      '#D8E9F6',
  borderLight: '#EAF4FF',
  tagTech:     '#E8F2FF',
  tagLife:     '#FFF0E8',
  tagEssay:    '#F0EEFF',
}

// ── Sky · Dark ───────────────────────────────────
export const skyDarkTheme: ThemeColors = {
  bg:          '#0C1A2E',
  bgCard:      '#112038',
  bgSubtle:    '#162540',
  text:        '#D6EEFF',
  textMuted:   '#7AAEC8',
  textLight:   '#3F6480',
  accent:      '#74C0FF',
  accentMid:   '#4A9EE8',
  accentPale:  '#1A3A5C',
  accentDeep:  '#90CFFF',
  accentWarm:  '#FFAA78',
  accentMuted: '#B8B0FF',
  border:      '#1E3A54',
  borderLight: '#162E46',
  tagTech:     '#0F2540',
  tagLife:     '#2E1A0E',
  tagEssay:    '#1C1A38',
}

// ── Jade · Light ─────────────────────────────────
export const jadeTheme: ThemeColors = {
  bg:          '#FAFAF7',
  bgCard:      '#FFFFFF',
  bgSubtle:    '#F4F2EE',
  text:        '#2C2C2C',
  textMuted:   '#7A7A7A',
  textLight:   '#ADADAD',
  accent:      '#7A9E7A',
  accentMid:   '#A8C4A8',
  accentPale:  '#DCE9DC',
  accentDeep:  '#4D7A4D',
  accentWarm:  '#C4956A',
  accentMuted: '#9A8FC4',
  border:      '#E4E0DA',
  borderLight: '#EEEBE6',
  tagTech:     '#EDF3ED',
  tagLife:     '#F5EEE5',
  tagEssay:    '#EDEAF5',
}

// ── Jade · Dark ───────────────────────────────────
export const jadeDarkTheme: ThemeColors = {
  bg:          '#161A16',
  bgCard:      '#1E221E',
  bgSubtle:    '#252A25',
  text:        '#E2EAE2',
  textMuted:   '#8AAA8A',
  textLight:   '#4A624A',
  accent:      '#8EC48E',
  accentMid:   '#6AAE6A',
  accentPale:  '#1C301C',
  accentDeep:  '#A8D4A8',
  accentWarm:  '#DEAF88',
  accentMuted: '#B2AADC',
  border:      '#2A342A',
  borderLight: '#222822',
  tagTech:     '#182018',
  tagLife:     '#281E10',
  tagEssay:    '#1E1A2E',
}

export const allThemes: Record<ThemeName, Record<ColorScheme, ThemeColors>> = {
  sky:  { light: skyTheme,  dark: skyDarkTheme  },
  jade: { light: jadeTheme, dark: jadeDarkTheme },
}

export function getThemeColors(name: ThemeName, scheme: ColorScheme): ThemeColors {
  return allThemes[name][scheme]
}

export const themeLabels: Record<ThemeName, { label: string; dot: string; desc: string }> = {
  sky:  { label: '天蓝', dot: '#3B8EFF', desc: '源自图标渐变' },
  jade: { label: '苔绿', dot: '#7A9E7A', desc: '日系清新' },
}

export function categoryColor(colors: ThemeColors): Record<string, string> {
  return {
    技术: colors.accent,
    生活: colors.accentWarm,
    随笔: colors.accentMuted,
  }
}

export function categoryBg(colors: ThemeColors): Record<string, string> {
  return {
    技术: colors.tagTech,
    生活: colors.tagLife,
    随笔: colors.tagEssay,
  }
}
