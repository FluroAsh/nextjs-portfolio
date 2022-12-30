import React from 'react'
import Link from 'next/link'

import useScrolling from 'hooks/useScrolling'
import { HeaderLogo } from 'components/HeaderLogo'
import ThemeToggle from 'components/ThemeToggle'

const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styles = {
    container: isScrolling
      ? 'dark:bg-slate-500/50 bg-orange-300/30 dark:border-transparent backdrop-blur border-b-slate-200'
      : 'dark:bg-slate-500/50 bg-orange-300/40'
  }

  return (
    // Drop Shadows not rendering correctly when not scrolling for some reason...
    <div
      className={`sticky z-50 top-0 w-full transition-all border-b dark:border-b-slate-500/50 border-b-orange-300/50 ${styles.container}`}
    >
      <nav className="flex justify-between max-w-screen-xl p-3 mx-auto">
        <HeaderLogo />

        <div className="flex items-center justify-center gap-3">
          <div className="hidden gap-3 sm:flex">
            <Link title="Go to Homepage" href="/" className="text-sm">
              home
            </Link>
            <Link title="Go to Ash's Blog" href="/blog" className="text-sm">
              blog
            </Link>
            <Link title="Contact Ash" href="/contact" className="text-sm">
              contact
            </Link>
          </div>

          <ThemeToggle />
          {/* TODO: Hamburger Menu Light: Black, Dark: white/slate-500 */}
          <div className="w-6 h-6 bg-orange-500 sm:hidden"></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
