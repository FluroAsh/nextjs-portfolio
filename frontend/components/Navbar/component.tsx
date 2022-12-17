import React from 'react'
import Link from 'next/link'
import useScrolling from 'hooks/useScrolling'

export const Navbar = () => {
  const [isScrolling] = useScrolling()

  const styleScrolling = isScrolling
    ? 'dark:bg-zinc-900/50'
    : 'bg:transparent border-transparent'

  return (
    // WHEN position is not at the top of the document
    // change opacity to 80% and include backdrop filter effects for blur
    <div
      className={`sticky top-0 z-99 w-full transition-all backdrop-blur border-b border-b-slate-500/50 ${styleScrolling} drop-shadow-md`}
    >
      <nav className="flex max-w-screen-lg p-3 mx-auto" data-testid="navbar">
        <span
          id="logo-container"
          className="flex items-center w-1/3 text-2xl text-sky-500 text-bold"
        >
          AT
        </span>

        <div
          id="navbar-links"
          className="flex items-center justify-center w-1/3 gap-5"
        >
          <Link title="Go to Homepage" href="/" className="text-sm uppercase">
            Home
          </Link>
          <Link
            title="Go to Ash's Blog"
            href="/"
            className="text-sm uppercase "
          >
            Blog
          </Link>
          <Link title="Contact Ash" href="/" className="text-sm uppercase">
            Contact
          </Link>
        </div>

        <div className="flex flex-1 w-1/3 mx-1">
          <input
            type="text"
            placeholder="Search"
            className="max-w-[150px] px-3 py-1 ml-auto rounded outline-none focus:outline-sky-500/80 bg:transparent"
          ></input>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
