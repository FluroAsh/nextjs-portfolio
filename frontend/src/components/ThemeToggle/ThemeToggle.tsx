import React, { useEffect, useState } from 'react'
import { faMoon, faSun } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTheme } from 'next-themes'
import { THEME_DARK, THEME_LIGHT } from 'constants/theme'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  // After mount we have access to theme
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  const handleTheme = () =>
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)

  return (
    <div
      className={`transition-colors duration-300 flex justify-center w-[32px] h-[32px] rounded-full 
      bg-orange-100 dark:bg-dark-background-primary border dark:border-slate-300 border-neutral-600`}
    >
      <button onClick={handleTheme}>
        {isDark ? (
          <FontAwesomeIcon icon={faSun} color="hsl(40, 100%, 50%)" />
        ) : (
          <FontAwesomeIcon icon={faMoon} color="hsl(0, 0%, 40%)" />
        )}
      </button>
    </div>
  )
}

export default ThemeToggle
