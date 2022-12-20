import React from 'react'
import Link from 'next/link'
import useScrolling from 'hooks/useScrolling'

export const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styles = {
    container: isScrolling
      ? 'dark:bg-slate-500/10 dark:border-transparent bg-orange-200/20 backdrop-blur border-b-slate-200'
      : 'dark:bg-slate-500/50 bg-orange-100/90'
  }

  return (
    <div
      className={`sticky top-0 z-99 w-full transition-all border-b dark:border-b-slate-500/50 ${styles.container} dark:drop-shadow-md `}
    >
      <nav
        className="flex justify-between max-w-screen-lg p-3 mx-auto"
        data-testid="navbar"
      >
        <span className="flex items-center text-2xl font-thin dark:text-sky-500 text-bold">
          Ashley Thompson
        </span>

        <div className="flex items-center justify-center gap-5">
          {/* TODO: Map over items to render these links */}
          {/* Title, to, target (eg _blank) */}
          <Link title="Go to Homepage" href="/" className="text-md">
            Home
          </Link>
          <Link title="Go to Ash's Blog" href="/blog" className="text-md">
            Blog
          </Link>
          <Link title="Contact Ash" href="/" className="text-md">
            Contact
          </Link>
          {/* TODO: Create a dark/light mode toggle */}
          <div className="w-[35px] h-[35px] bg-orange-300 rounded"></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
