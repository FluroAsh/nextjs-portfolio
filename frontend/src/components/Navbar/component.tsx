import React from 'react'
import Link from 'next/link'
import useScrolling from 'hooks/useScrolling'

export const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styleScrolling = isScrolling

  const styles = {
    container: isScrolling
      ? 'dark:bg-zinc-900/50'
      : 'bg:transparent border-transparent'
  }

  return (
    <div
      className={`sticky top-0 z-99 w-full transition-all backdrop-blur border-b border-b-slate-500/50 ${styles.container} drop-shadow-md`}
    >
      <nav
        className="flex justify-between max-w-screen-lg p-3 mx-auto"
        data-testid="navbar"
      >
        <span className="flex items-center text-2xl text-sky-500 text-bold">
          AT
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
          <div className="w-[35px] h-[35px] bg-slate-300"></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
