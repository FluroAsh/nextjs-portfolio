import Link from "next/link"
import clsx from "clsx"
import { ROUTE_URL } from "constants/paths"

import HeaderLogo from "components/Navbar/HeaderLogo"
import ThemeToggle from "components/Navbar/ThemeToggle"
import useScrolling from "hooks/useScrolling"

import HamburgerMenu from "./HamburgerMenu"

export const NAV_LINKS = [
  {
    title: "Go to Homepage",
    text: "home",
    href: ROUTE_URL.HOME,
  },
  {
    title: "Go to Ash's blog",
    text: "blog",
    href: ROUTE_URL.BLOG,
  },
]

const Navbar = () => {
  const isScrolling = useScrolling()

  const styles = {
    container: isScrolling
      ? "dark:bg-slate-500/50 bg-orange-300/70 dark:border-transparent backdrop-blur shadow-lg"
      : "dark:bg-slate-500/50 bg-orange-300/80",
  }

  

  return (
    <div
      className={clsx(
        styles.container,
        "sticky z-50 top-0 w-full transition duration-300 border-b dark:border-b-slate-500/50 border-b-orange-300/50"
      )}
    >
      <nav className="flex flex-row-reverse justify-between max-w-screen-xl p-3 mx-auto sm:flex-row">
        <div id="header-wrapper" className="relative">
          <HeaderLogo className="absolute right-logo-spacing xs:relative xs:right-0 sm:relative sm:left-0" />
        </div>

        <div className="flex items-center justify-center gap-2">
          {/* -- Desktop -- */}
          <div className="hidden gap-3 mr-2 sm:flex">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={`${link.title}-${idx}`}
                href={link.href}
                title={link.title}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* -- Mobile -- */}
          <HamburgerMenu className="sm:hidden" iconSize="xl" />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
