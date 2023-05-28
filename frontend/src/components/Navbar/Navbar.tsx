import Link from 'next/link'
import clsx from 'clsx'

import useScrolling from 'hooks/useScrolling'
import HeaderLogo from 'components/Navbar/HeaderLogo'
import ThemeToggle from 'components/ThemeToggle'
import HamburgerMenu from './HamburgerMenu'

export const NAV_LINKS = [
  {
    title: 'Go to Homepage',
    text: 'home',
    href: '/'
  },
  {
    title: "Go to Ash's blog",
    text: 'blog',
    href: '/blog'
  },
  {
    title: 'About Ash',
    text: 'about',
    href: '/about'
  }
]

const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styles = {
    container: isScrolling
      ? 'dark:bg-slate-500/50 bg-orange-300/60 dark:border-transparent backdrop-blur border-b-slate-200 shadow-lg'
      : 'dark:bg-slate-500/50 bg-orange-300/70'
  }

  return (
    <div
      // TODO: Refactor this wrapper div to use sticky so we can have the correct index page UI & layout throughout the app.
      className={clsx(
        styles.container,
        'fixed z-50 top-0 w-screen transition-all border-b dark:border-b-slate-500/50 border-b-orange-300/50'
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
