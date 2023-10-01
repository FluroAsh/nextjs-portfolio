import Link from "next/link"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faMessage } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { externalLinkProps, GITHUB_URL, TWITTER_URL } from "constants/links"
import { ROUTE_URL } from "constants/paths"

import HeaderLogo from "components/Navbar/HeaderLogo"
import ThemeToggle from "components/Navbar/ThemeToggle"
import useScrolling from "hooks/useScrolling"

import HamburgerMenu from "./HamburgerMenu"

export const NAV_LINKS = [
  {
    title: "Go to Ash's blog",
    text: "Blog",
    href: ROUTE_URL.BLOG,
    rel: "",
    target: "",
    icon: <FontAwesomeIcon icon={faMessage} size="lg" />,
  },
  {
    title: "",
    text: "GitHub",
    href: GITHUB_URL,
    ...externalLinkProps,
    icon: <FontAwesomeIcon icon={faGithub} size="lg" />,
  },
  {
    title: "",
    text: "Twitter",
    href: TWITTER_URL,
    ...externalLinkProps,
    icon: <FontAwesomeIcon icon={faTwitter} size="lg" />,
  },
]

const Navbar = () => {
  const isScrolling = useScrolling()

  const styles = {
    container: isScrolling
      ? "dark:bg-slate-500/50 bg-orange-300/70 dark:border-transparent backdrop-blur shadow-lg"
      : "dark:bg-slate-500/50 bg-orange-300/80",
  }

  return (
    <div
      className={clsx(
        styles.container,
        "sticky z-50 top-0 w-full transition duration-300 border-b dark:border-b-slate-500/50 border-b-orange-300/50"
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
                target={link.target}
                rel={link.rel}
                tabIndex={0}
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
