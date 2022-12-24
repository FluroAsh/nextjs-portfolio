import React, { useEffect } from 'react'

import { applyThemePreference } from './helpers'
import { useThemeStore } from 'lib/stores/themeStore'

const ThemeToggle = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    applyThemePreference(theme)
  }, [theme])

  return <button onClick={toggleTheme}>Switch</button>
}

export default ThemeToggle
