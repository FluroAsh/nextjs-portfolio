import React from 'react'

import { useTheme } from 'next-themes'

import { THEME_DARK, THEME_LIGHT } from 'constants/theme'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleTheme = () =>
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)

  return (
    <div
      className={`transition-colors duration-300 flex align-center justify-center w-[25px] h-[25px] bg-slate-500 ${
        isDark ? 'bg-orange-200' : 'bg-dark-background-primary'
      } rounded drop-shadow-sm`}
    >
      {/* TODO: Add icons instead of emojis */}
      <button onClick={handleTheme}>{isDark ? '🌞' : '🌙'}</button>
    </div>
  )
}

export default ThemeToggle
