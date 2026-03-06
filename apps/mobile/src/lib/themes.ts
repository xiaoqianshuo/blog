export type ThemeName = 'sky' | 'jade' | 'rose' | 'amber' | 'dusk' | 'ink';
export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  bg: string;
  bgCard: string;
  bgSubtle: string;
  text: string;
  textMuted: string;
  textLight: string;
  accent: string;
  accentMid: string;
  accentPale: string;
  accentDeep: string;
  accentWarm: string;
  accentMuted: string;
  border: string;
  borderLight: string;
  tagTech: string;
  tagLife: string;
  tagEssay: string;
}

// ── Sky · Light ──────────────────────────────────
export const skyTheme: ThemeColors = {
  bg: '#F4F9FE',
  bgCard: '#FFFFFF',
  bgSubtle: '#EAF4FF',
  text: '#0E2340',
  textMuted: '#4B6A87',
  textLight: '#8AAFC9',
  accent: '#3B8EFF',
  accentMid: '#74C0FF',
  accentPale: '#D6F2FF',
  accentDeep: '#2D7DFF',
  accentWarm: '#FF8A4C',
  accentMuted: '#9B8FFF',
  border: '#D8E9F6',
  borderLight: '#EAF4FF',
  tagTech: '#E8F2FF',
  tagLife: '#FFF0E8',
  tagEssay: '#F0EEFF',
};

// ── Sky · Dark ───────────────────────────────────
export const skyDarkTheme: ThemeColors = {
  bg: '#0C1A2E',
  bgCard: '#112038',
  bgSubtle: '#162540',
  text: '#D6EEFF',
  textMuted: '#7AAEC8',
  textLight: '#3F6480',
  accent: '#74C0FF',
  accentMid: '#4A9EE8',
  accentPale: '#1A3A5C',
  accentDeep: '#90CFFF',
  accentWarm: '#FFAA78',
  accentMuted: '#B8B0FF',
  border: '#1E3A54',
  borderLight: '#162E46',
  tagTech: '#0F2540',
  tagLife: '#2E1A0E',
  tagEssay: '#1C1A38',
};

// ── Jade · Light ─────────────────────────────────
export const jadeTheme: ThemeColors = {
  bg: '#FAFAF7',
  bgCard: '#FFFFFF',
  bgSubtle: '#F4F2EE',
  text: '#2C2C2C',
  textMuted: '#7A7A7A',
  textLight: '#ADADAD',
  accent: '#7A9E7A',
  accentMid: '#A8C4A8',
  accentPale: '#DCE9DC',
  accentDeep: '#4D7A4D',
  accentWarm: '#C4956A',
  accentMuted: '#9A8FC4',
  border: '#E4E0DA',
  borderLight: '#EEEBE6',
  tagTech: '#EDF3ED',
  tagLife: '#F5EEE5',
  tagEssay: '#EDEAF5',
};

// ── Jade · Dark ───────────────────────────────────
export const jadeDarkTheme: ThemeColors = {
  bg: '#161A16',
  bgCard: '#1E221E',
  bgSubtle: '#252A25',
  text: '#E2EAE2',
  textMuted: '#8AAA8A',
  textLight: '#4A624A',
  accent: '#8EC48E',
  accentMid: '#6AAE6A',
  accentPale: '#1C301C',
  accentDeep: '#A8D4A8',
  accentWarm: '#DEAF88',
  accentMuted: '#B2AADC',
  border: '#2A342A',
  borderLight: '#222822',
  tagTech: '#182018',
  tagLife: '#281E10',
  tagEssay: '#1E1A2E',
};

// ── Rose · Light ──────────────────────────────────
export const roseTheme: ThemeColors = {
  bg: '#FFF8F7',
  bgCard: '#FFFFFF',
  bgSubtle: '#FFF0EE',
  text: '#2A1A1C',
  textMuted: '#8A5A5C',
  textLight: '#C4A0A2',
  accent: '#C4616A',
  accentMid: '#E0969C',
  accentPale: '#FFE4E6',
  accentDeep: '#A84E56',
  accentWarm: '#E8864C',
  accentMuted: '#9A8FC4',
  border: '#F0D8DA',
  borderLight: '#FAF0F1',
  tagTech: '#F5ECEC',
  tagLife: '#FFF3EC',
  tagEssay: '#F0EEFD',
};

// ── Rose · Dark ────────────────────────────────────
export const roseDarkTheme: ThemeColors = {
  bg: '#1E1012',
  bgCard: '#2A1518',
  bgSubtle: '#321A1D',
  text: '#F5DDE0',
  textMuted: '#C48E90',
  textLight: '#7A4848',
  accent: '#E89498',
  accentMid: '#D07070',
  accentPale: '#3D1C20',
  accentDeep: '#F0B4B8',
  accentWarm: '#FFAA78',
  accentMuted: '#B8B0FF',
  border: '#3D2226',
  borderLight: '#2E1A1E',
  tagTech: '#261416',
  tagLife: '#2A1A0E',
  tagEssay: '#1E1A2E',
};

// ── Amber · Light ─────────────────────────────────
export const amberTheme: ThemeColors = {
  bg: '#FDFAF4',
  bgCard: '#FFFFFF',
  bgSubtle: '#F7F2E6',
  text: '#2A2018',
  textMuted: '#806040',
  textLight: '#BFA878',
  accent: '#C4841E',
  accentMid: '#DEB060',
  accentPale: '#F7E8C4',
  accentDeep: '#A86C10',
  accentWarm: '#E05040',
  accentMuted: '#7A90C4',
  border: '#E8D8B0',
  borderLight: '#F5EDD6',
  tagTech: '#F0E8D0',
  tagLife: '#FFE8E0',
  tagEssay: '#EAE8F5',
};

// ── Amber · Dark ───────────────────────────────────
export const amberDarkTheme: ThemeColors = {
  bg: '#1A1408',
  bgCard: '#221C0C',
  bgSubtle: '#2A2210',
  text: '#F5E8C8',
  textMuted: '#C4A060',
  textLight: '#706040',
  accent: '#E8C060',
  accentMid: '#C8A040',
  accentPale: '#362C10',
  accentDeep: '#F0D080',
  accentWarm: '#FF8060',
  accentMuted: '#90A0DC',
  border: '#3A3018',
  borderLight: '#2A2410',
  tagTech: '#201A08',
  tagLife: '#2E1A0A',
  tagEssay: '#1A1830',
};

// ── Dusk · Light ──────────────────────────────────
export const duskTheme: ThemeColors = {
  bg: '#FAF8FF',
  bgCard: '#FFFFFF',
  bgSubtle: '#F2EEFF',
  text: '#1E1A2E',
  textMuted: '#6A5A8A',
  textLight: '#ADA0CA',
  accent: '#7B5EA7',
  accentMid: '#A888CC',
  accentPale: '#E8E0FF',
  accentDeep: '#5A3A8A',
  accentWarm: '#E87060',
  accentMuted: '#60A0A8',
  border: '#DCD5F0',
  borderLight: '#EDE8FF',
  tagTech: '#EAE8FF',
  tagLife: '#FFE8E4',
  tagEssay: '#E4F4F4',
};

// ── Dusk · Dark ────────────────────────────────────
export const duskDarkTheme: ThemeColors = {
  bg: '#12101E',
  bgCard: '#1A1830',
  bgSubtle: '#201E38',
  text: '#E8E0FF',
  textMuted: '#A090C8',
  textLight: '#504870',
  accent: '#C8A8F0',
  accentMid: '#A888D0',
  accentPale: '#281E3E',
  accentDeep: '#D8C0FF',
  accentWarm: '#FF9080',
  accentMuted: '#80C0C8',
  border: '#2E2848',
  borderLight: '#201C38',
  tagTech: '#181630',
  tagLife: '#2E1818',
  tagEssay: '#12201E',
};

// ── Ink · Light ───────────────────────────────────
export const inkTheme: ThemeColors = {
  bg: '#F7F5F0',
  bgCard: '#FDFCFA',
  bgSubtle: '#F0EDE6',
  text: '#1C1C1C',
  textMuted: '#6E6E6E',
  textLight: '#B0B0AC',
  accent: '#C04040',
  accentMid: '#D87070',
  accentPale: '#FFE8E0',
  accentDeep: '#9A2828',
  accentWarm: '#D4A020',
  accentMuted: '#607888',
  border: '#DDD8CE',
  borderLight: '#ECEAE4',
  tagTech: '#F0EDEA',
  tagLife: '#FFE8E0',
  tagEssay: '#E8E4F8',
};

// ── Ink · Dark ─────────────────────────────────────
export const inkDarkTheme: ThemeColors = {
  bg: '#141210',
  bgCard: '#1E1A18',
  bgSubtle: '#252018',
  text: '#EAE4D8',
  textMuted: '#A89880',
  textLight: '#585040',
  accent: '#E07070',
  accentMid: '#C05050',
  accentPale: '#3A1E1A',
  accentDeep: '#F09090',
  accentWarm: '#E8C050',
  accentMuted: '#8098A8',
  border: '#302820',
  borderLight: '#241E18',
  tagTech: '#1E1810',
  tagLife: '#281810',
  tagEssay: '#1A1A2A',
};

export const allThemes: Record<ThemeName, Record<ColorScheme, ThemeColors>> = {
  sky: { light: skyTheme, dark: skyDarkTheme },
  jade: { light: jadeTheme, dark: jadeDarkTheme },
  rose: { light: roseTheme, dark: roseDarkTheme },
  amber: { light: amberTheme, dark: amberDarkTheme },
  dusk: { light: duskTheme, dark: duskDarkTheme },
  ink: { light: inkTheme, dark: inkDarkTheme },
};

export function getThemeColors(name: ThemeName, scheme: ColorScheme): ThemeColors {
  return allThemes[name][scheme];
}

export const themeLabels: Record<ThemeName, { label: string; dot: string; desc: string }> = {
  jade: { label: '苔绿', dot: '#7A9E7A', desc: '静谧·日系' },
  sky: { label: '天蓝', dot: '#3B8EFF', desc: '清朗·海天' },
  rose: { label: '玫瑰', dot: '#C4616A', desc: '浪漫·典雅' },
  amber: { label: '琥珀', dot: '#C4841E', desc: '温暖·金调' },
  dusk: { label: '暮色', dot: '#7B5EA7', desc: '黄昏·紫调' },
  ink: { label: '水墨', dot: '#C04040', desc: '朱砂·笔意' },
};

export function categoryColor(colors: ThemeColors): Record<string, string> {
  return {
    技术: colors.accent,
    生活: colors.accentWarm,
    随笔: colors.accentMuted,
  };
}

export function categoryBg(colors: ThemeColors): Record<string, string> {
  return {
    技术: colors.tagTech,
    生活: colors.tagLife,
    随笔: colors.tagEssay,
  };
}
