import React, { useEffect, useState } from 'react'

const MIN_SCROLL_HEIGHT = 15

export const NavBar = () => {
  // TODO: Move to state? :)
  // Zustand/Context API
  const [isScrolling, setIsScrolling] = useState(false)

  const checkScrolling = () =>
    setIsScrolling(window.scrollY > MIN_SCROLL_HEIGHT)

  useEffect(() => {
    window.addEventListener('scroll', checkScrolling)
    return () => {
      window.removeEventListener('scroll', checkScrolling)
    }
  }, [])

  return (
    // WHEN position is not at the top of the document
    // change opacity to 80% and include backdrop filter effects for blur
    <div
      className={`sticky top-0 z-99 w-full mb-3 transition-all backdrop-blur border-b border-b-slate-500/50 ${
        isScrolling
          ? 'dark:bg-zinc-900/50'
          : 'bg:transparent border-transparent'
      }  
       drop-shadow-md`}
    >
      <nav className="flex p-3">
        <span
          id="logo-container"
          className="flex items-center w-1/3 text-sky-500"
        >
          LOGO
        </span>

        <div
          id="navbar-links"
          className="flex items-center justify-center w-1/3 gap-5 dark:text-white"
        >
          <a title="Go to Homepage" href="/" className="uppercase ">
            Home
          </a>
          <a title="Go to Ash's Blog" href="/" className="uppercase ">
            Blog
          </a>
          <a title="Contact Ash" href="/" className="uppercase ">
            Contact
          </a>
        </div>

        <div className="flex w-1/3 mx-1 dark:text-white">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 ml-auto rounded outline-none focus:outline-sky-500/80 "
          ></input>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
