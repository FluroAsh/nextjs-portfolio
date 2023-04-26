import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { faBars, faClose } from '@fortawesome/pro-solid-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'

interface IHamburgerMenu {
  className?: string
  iconSize?: FontAwesomeIconProps['size']
}

const HamburgerMenu: React.FC<IHamburgerMenu> = ({
  className: extraStyles,
  iconSize
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(!open)
    // disable scrolling
    const body = document.querySelector('body')
    body && body.classList.toggle('overflow-hidden')
  }

  const handleLinkClick = () => {
    // need to remove overflow-hidden from body before navigating to a new page
    setOpen(false)
    const body = document.querySelector('body')
    body && body.classList.remove('overflow-hidden')
  }

  return (
    <div className={clsx(extraStyles, 'min-w-[24px]')}>
      {open ? (
        <FontAwesomeIcon
          icon={faClose}
          size={iconSize}
          className="cursor-pointer"
          onClick={handleClick}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          size={iconSize}
          className="cursor-pointer"
          onClick={handleClick}
        />
      )}

      <div
        id="menu-drawer"
        className={clsx(
          open && '-translate-x-full',
          `absolute w-80 xs:w-screen p-5 dark:bg-slate-700 bg-orange-400 top-[57px] xs:-right-full -right-80 h-[calc(100vh-57px)] transition-transform duration-300 
          z-40 shadow-lg`
        )}
      >
        <div className="flex flex-col w-full h-full">
          {/* TODO: Map these Link components? w/ Titles + Hrefs */}
          <Link
            title="Go to Homepage"
            href="/"
            className="text-lg"
            onClick={handleLinkClick}
          >
            home
          </Link>
          <Link
            title="Go to Ash's Blog"
            href="/blog"
            className="text-lg"
            onClick={handleLinkClick}
          >
            blog
          </Link>
          <Link
            title="About Ash"
            href="/about"
            className="text-lg"
            onClick={handleLinkClick}
          >
            about
          </Link>
        </div>
      </div>

      <div
        id="drawer-bg"
        className={clsx(
          open ? 'opacity-100' : 'opacity-0 ',
          'xs:hidden absolute top-14 left-0 w-screen h-[calc(100vh-57px)] dark:bg-slate-700/50 bg-orange-700/30 transition-opacity duration-300 ease-in-out z-30'
        )}
      ></div>
    </div>
  )
}

export default HamburgerMenu
