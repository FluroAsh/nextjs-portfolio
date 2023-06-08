import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { faBars, faClose } from "@fortawesome/pro-solid-svg-icons"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import clsx from "clsx"

import { NAV_LINKS } from "./Navbar"

interface IHamburgerMenu {
  className?: string
  iconSize?: FontAwesomeIconProps["size"]
}

const HamburgerMenu: React.FC<IHamburgerMenu> = ({
  className: extraStyles,
  iconSize = "xl",
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const handleClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    isIcon?: boolean
  ) => {
    event?.stopPropagation() // prevent propagation to the document (firing handleOutsideClick callback)
    isIcon ? setOpen(!open) : setOpen(false)

    // disable scrolling
    document?.body && document?.body?.classList.toggle("overflow-hidden")
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const clickedOutside =
        drawerRef.current && !drawerRef.current.contains(event.target as Node)

      if (clickedOutside) {
        setOpen(false)
        document?.body && document?.body?.classList.remove("overflow-hidden")
      }
    }

    document.addEventListener("click", handleOutsideClick)
    return () => document.removeEventListener("click", handleOutsideClick)
  }, [drawerRef])

  return (
    <div className={clsx(extraStyles, "min-w-[24px]")}>
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
          open && "translate-x-full",
          "absolute w-80 p-5 dark:bg-slate-700 bg-orange-300 top-navbar-height -left-80 -h-navbar transition-transform duration-300 z-40 shadow-lg xs:-left-full xs:w-screen"
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
              className="p-5 my-2 transition-colors duration-150 rounded shadow-sm bg-orange-600/50 dark:bg-slate-500/50 hover:bg-orange-400/50 dark:hover:bg-slate-300/50 dark:hover:shadow-lg"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>

      <div
        id="drawer-bg"
        className={clsx(
          open ? "block" : "hidden",
          "xs:hidden absolute top-navbar-height left-0 w-screen -h-navbar dark:bg-slate-700/50 bg-orange-700/30 transition-opacity duration-300 ease-in-out z-30"
        )}
      ></div>
    </div>
  )
}

export default HamburgerMenu
