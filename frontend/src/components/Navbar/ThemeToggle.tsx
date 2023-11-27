/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react"
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTheme } from "next-themes"

import { useMounted } from "hooks"

import { cn } from "lib/utils"

// eslint-ignore-next-line
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const mounted = useMounted()

  // After mount we have access to theme
  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-neutral-100 animate-pulse w-8 h-8 rounded-full dark:bg-dark-background-primary",
          "border-slate-500 dark:border-slate-300"
        )}
      ></div>
    )
  }

  const handleTheme = () =>
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)

  return (
    <button className="relative" onClick={handleTheme}>
      <div
        className={cn(
          "transition-colors duration-300 flex justify-center w-[32px] h-[32px] rounded-full",
          "bg-neutral-100 dark:bg-dark-background-primary border-2 dark:border-slate-300 border-slate-500"
        )}
      >
        {isDark ? (
          <FontAwesomeIcon
            title="Change to Light Mode"
            icon={faSun}
            className="absolute top-[7.5px]"
            color="hsl(40, 100%, 50%)"
            height={16}
          />
        ) : (
          <FontAwesomeIcon
            title="Change to Dark Mode"
            icon={faMoon}
            className="absolute top-[7.5px]"
            color="hsl(0, 0%, 40%)"
            height={16}
          />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
