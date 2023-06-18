import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTheme } from "next-themes"

import { useMounted } from "hooks"

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  // After mount we have access to theme
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  const handleTheme = () =>
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)

  return (
    <button className="relative" onClick={handleTheme}>
      <div
        className="transition-colors duration-300 flex justify-center w-[32px] h-[32px] rounded-full
      bg-orange-100 dark:bg-dark-background-primary border dark:border-slate-300 border-neutral-600"
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
