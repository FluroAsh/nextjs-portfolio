import React from 'react'

import { THEME_DARK, THEME_LIGHT } from 'constants/theme'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleTheme = () =>
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)

  return <button onClick={handleTheme}>Switch</button>
}

export default ThemeToggle
