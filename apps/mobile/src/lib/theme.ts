import { Platform } from 'react-native'

export const colors = {
  // ── Backgrounds – pale sky ────────────────────
  bg: '#F4F9FE',
  bgCard: '#FFFFFF',
  bgSubtle: '#EAF4FF',

  // ── Text – deep navy (derived from #0B3A7A) ───
  text: '#0E2340',
  textMuted: '#4B6A87',
  textLight: '#8AAFC9',

  // ── Accent – sky blue (icon gradient) ─────────
  accent: '#3B8EFF',       // between #2D7DFF and #74C0FF
  accentMid: '#74C0FF',    // icon mid colour
  accentPale: '#D6F2FF',   // icon bottom colour
  accentDeep: '#2D7DFF',   // icon top colour

  // ── Secondary accents ─────────────────────────
  accentWarm: '#FF8A4C',   // sunrise orange  – 生活 posts
  accentMuted: '#9B8FFF',  // twilight purple  – 随笔 posts

  // ── Borders ───────────────────────────────────
  border: '#D8E9F6',
  borderLight: '#EAF4FF',

  // ── Tags ──────────────────────────────────────
  tagTech: '#E8F2FF',
  tagLife: '#FFF0E8',
  tagEssay: '#F0EEFF',

  // ── Dark mode variants ────────────────────────
  dark: {
    bg: '#0A1828',
    bgCard: '#111E30',
    bgSubtle: '#162438',
    text: '#D6EEFF',
    textMuted: '#7AA5C8',
    textLight: '#456480',
    border: '#1E3350',
    borderLight: '#17293F',
  },
} as const

export const fonts = {
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  sans: Platform.OS === 'ios' ? undefined : undefined,
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
}

export const categoryColor: Record<string, string> = {
  技术: colors.accent,
  生活: colors.accentWarm,
  随笔: colors.accentMuted,
}

export const categoryBg: Record<string, string> = {
  技术: colors.tagTech,
  生活: colors.tagLife,
  随笔: colors.tagEssay,
}
