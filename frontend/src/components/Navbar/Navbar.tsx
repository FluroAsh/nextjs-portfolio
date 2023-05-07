import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import useScrolling from 'hooks/useScrolling'
import HeaderLogo from 'components/HeaderLogo'
import ThemeToggle from 'components/ThemeToggle'
import HamburgerMenu from './HamburgerMenu'
import { NAV_LINKS } from 'lib/constants'

const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styles = {
    container: isScrolling
      ? 'dark:bg-slate-500/50 bg-orange-300/60 dark:border-transparent backdrop-blur border-b-slate-200 shadow-lg'
      : 'dark:bg-slate-500/50 bg-orange-300/70'
  }

  return (
    <div
      className={clsx(
        styles.container,
        'fixed z-50 top-0 w-screen transition-all border-b dark:border-b-slate-500/50 border-b-orange-300/50'
      )}
    >
      <nav className="z-50 flex flex-row-reverse justify-start max-w-screen-xl p-3 mx-auto sm:flex-row sm:justify-between">
        <HeaderLogo className="flex items-center flex-grow justify-center sm:flex-grow-0" />

        <div className="flex items-center justify-center gap-2">
          {/* Hidden on small screens */}
          <div className="hidden gap-3 sm:flex">
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

          <HamburgerMenu className="sm:hidden" iconSize="xl" />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
