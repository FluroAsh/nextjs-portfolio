import React, { RefObject, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { faBars, faClose } from '@fortawesome/pro-solid-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import { NAV_LINKS, NAVBAR_HEIGHT } from 'lib/constants'

interface IHamburgerMenu {
  className?: string
  iconSize?: FontAwesomeIconProps['size']
}

const HamburgerMenu: React.FC<IHamburgerMenu> = ({
  className: extraStyles,
  iconSize = 'xl'
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const handleClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    isIcon: boolean = false
  ) => {
    event?.stopPropagation() // prevent propagation to the document (firing handleOutsideClick callback)
    isIcon ? setOpen(!open) : setOpen(false)

    // disable scrolling
    const body = document.querySelector('body')
    body && body.classList.toggle('overflow-hidden')
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const clickedOutside =
        drawerRef.current && !drawerRef.current.contains(event.target as Node)
      clickedOutside && setOpen(false)
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [drawerRef])

  return (
    <div className={clsx(extraStyles, 'min-w-[24px]')}>
      {open ? (
        <FontAwesomeIcon
          icon={faClose}
          size={iconSize}
          className="cursor-pointer"
          onClick={(event) => handleClick(event, true)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          size={iconSize}
          className="cursor-pointer"
          onClick={(event) => handleClick(event, true)}
        />
      )}

      <div
        id="menu-drawer"
        className={clsx(
          open && 'translate-x-full',
          `absolute w-80 p-5 dark:bg-slate-700 bg-orange-300 top-[${NAVBAR_HEIGHT}px] -left-80 h-[calc(100vh-57px)] transition-transform duration-300 
          z-40 shadow-lg xs:-left-full xs:w-screen`
        )}
        ref={drawerRef}
      >
        <div className="flex flex-col w-full h-full">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={`${link.title}-${idx}`}
              title={link.title}
              href={link.href}
              onClick={handleClick} // close drawer when navigating
              className={`my-2 bg-orange-600/50 dark:bg-slate-500/50 p-5 rounded hover:bg-orange-400/50 dark:hover:bg-slate-300/50 
              dark:hover:shadow-lg shadow-sm transition-colors duration-150`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>

      <div
        id="drawer-bg"
        className={clsx(
          open ? 'block' : 'hidden',
          `xs:hidden absolute top-14 left-0 w-screen h-[calc(100vh-${NAVBAR_HEIGHT}px)] dark:bg-slate-700/50 bg-orange-700/30 
          transition-opacity duration-300 ease-in-out z-30`
        )}
      ></div>
    </div>
  )
}

export default HamburgerMenu
