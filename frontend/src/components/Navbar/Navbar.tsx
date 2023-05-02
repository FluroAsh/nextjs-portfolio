import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import useScrolling from 'hooks/useScrolling'
import HeaderLogo from 'components/HeaderLogo'
import ThemeToggle from 'components/ThemeToggle'
import HamburgerMenu from './HamburgerMenu'

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
      <nav className="z-50 flex justify-between max-w-screen-xl p-3 mx-auto">
        <HeaderLogo />

        <div className="flex items-center justify-center gap-3">
          <div className="hidden gap-3 sm:flex">
            <Link title="Go to Homepage" href="/" className="text-sm">
              home
            </Link>
            <Link title="Go to Ash's Blog" href="/blog" className="text-sm">
              blog
            </Link>
            <Link title="About Ash" href="/about" className="text-sm">
              about
            </Link>
          </div>

          <ThemeToggle />
          <HamburgerMenu className="sm:hidden" iconSize="xl" />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
