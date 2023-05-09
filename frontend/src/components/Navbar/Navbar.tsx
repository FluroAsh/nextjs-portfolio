import React, { useEffect, useRef, useState } from 'react'
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
      <nav className="z-50 flex flex-row-reverse max-w-screen-xl p-3 mx-auto sm:flex-row justify-between">
        <div id="header-wrapper" className="relative">
          <HeaderLogo className="absolute right-[calc(50vw-80px)] xs:relative xs:right-0 sm:relative sm:left-0" />
        </div>

        <div className="flex items-center justify-center gap-2">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-3 mr-2">
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

          {/* Mobile Navigation */}
          <HamburgerMenu className="sm:hidden" iconSize="xl" />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
