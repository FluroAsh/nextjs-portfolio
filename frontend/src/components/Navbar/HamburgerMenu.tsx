import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { faBars, faClose, faHome } from "@fortawesome/pro-solid-svg-icons"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"

import { cn } from "lib/utils"

import { NAV_LINKS } from "./Navbar"

interface HamburgerMenuProps {
  className?: string
  iconSize?: FontAwesomeIconProps["size"]
}

const mobileIconStyles = cn(
  "flex items-center gap-3 p-5 my-2 transition-colors rounded shadow-sm bg-orange-600/50 hover:bg-orange-400/50 dark:hover:bg-slate-300/50 ",
  "dark:bg-slate-500/50 dark:hover:shadow-lg"
)

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  className: extraStyles,
  iconSize = "xl",
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { isIcon }: { isIcon?: boolean } = {}
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
    /** Open/Close buttons */
    <div className={cn(extraStyles, "min-w-[24px]")}>
      <button onClick={(event) => handleClick(event, { isIcon: true })}>
        {open ? (
          <FontAwesomeIcon
            icon={faClose}
            size={iconSize}
            className="cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            size={iconSize}
            className="cursor-pointer"
          />
        )}
      </button>

      <div
        id="menu-drawer"
        className={cn(
          open && "translate-x-full",
          "absolute w-80 p-5 dark:bg-slate-700 bg-orange-300 top-navbar-height -left-80 -h-navbar transition-transform duration-300 z-40 shadow-lg xs:-left-full xs:w-screen"
        )}
        ref={drawerRef}
      >
        <div className="flex flex-col w-full h-full">
          <button onClick={handleClick}>
            <Link title="Home" href="/" className={mobileIconStyles}>
              <FontAwesomeIcon icon={faHome} size="lg" />
              Home
            </Link>
          </button>
          {NAV_LINKS.map((link, idx) => (
            <button onClick={handleClick} key={`${link.title}-${idx}`}>
              <Link
                title={link.title}
                href={link.href}
                rel={link.rel}
                target={link.target}
                className={mobileIconStyles}
              >
                {link.icon()}
                {link.text}
              </Link>
            </button>
          ))}
        </div>
      </div>

      <div
        id="drawer-bg"
        className={cn(
          open ? "block" : "hidden",
          "xs:hidden absolute top-navbar-height left-0 w-screen -h-navbar dark:bg-slate-700/50 bg-orange-700/30 transition-opacity duration-300 ease-in-out z-30"
        )}
      ></div>
    </div>
  )
}

export default HamburgerMenu
