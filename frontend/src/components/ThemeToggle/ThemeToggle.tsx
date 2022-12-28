import React from 'react'

import { useTheme } from 'next-themes'

import { THEME_DARK, THEME_LIGHT } from 'constants/theme'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleTheme = () =>
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)

  return (
    <div className="flex justify-center w-[25px] h-[25px]">
      <button onClick={handleTheme}>☀️</button>
    </div>
  )
}

export default ThemeToggle
