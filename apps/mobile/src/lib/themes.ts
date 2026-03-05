import type { ColorSchemeName } from 'react-native'

export type ThemeName = 'sky' | 'jade'

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

// ── Sky theme (from icon.svg gradient) ──────────
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

// ── Jade theme (Japanese minimal / sage green) ───
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

export const themes: Record<ThemeName, ThemeColors> = {
  sky:  skyTheme,
  jade: jadeTheme,
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
