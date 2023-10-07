import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "constants/links"

import { cn } from "lib/utils"

const IconLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <div className="flex items-center">
    <a href={href} rel="noreferrer" target="_blank">
      {icon}
    </a>
  </div>
)

const iconStyles =
  "hover:dark:text-slate-300 dark:text-white hover:text-neutral-300 text-neutral-100 transition-text duration-300"

export const Footer = () => {
  return (
    <footer
      className={cn(
        "flex flex-col items-center p-3 mt-5 transition-colors duration-300 border-t border-neutral-700 bg-neutral-700",
        "dark:bg-sky-700 dark:border-sky-900"
      )}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <IconLink
            href={GITHUB_URL}
            icon={
              <FontAwesomeIcon
                icon={faGithub}
                size="xl"
                className={iconStyles}
              />
            }
          />
          <IconLink
            href={TWITTER_URL}
            icon={
              <FontAwesomeIcon
                icon={faTwitter}
                size="xl"
                className={iconStyles}
              />
            }
          />
          <IconLink
            href={LINKEDIN_URL}
            icon={
              <FontAwesomeIcon
                icon={faLinkedinIn}
                size="xl"
                className={iconStyles}
              />
            }
          />
        </div>
      </div>
      <div className="mt-2 text-sm dark:text-slate-300 text-neutral-300">
        All rights reserved © Ashley Thompson 2023
      </div>
    </footer>
  )
}
