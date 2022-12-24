import { THEME_DARK, THEME_LIGHT } from 'constants/theme'

export const applyThemePreference = (theme: string) => {
  const root = window.document.documentElement
  const isDark = theme === THEME_DARK
  root.className = isDark ? THEME_LIGHT : THEME_DARK
}
