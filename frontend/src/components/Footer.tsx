import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "constants/links"

const IconLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <div className="flex items-center">
    <a href={href} rel="noreferrer" target="_blank">
      {icon}
    </a>
  </div>
)

const iconStyles =
  "hover:dark:text-slate-300 dark:text-white hover:text-orange-400 text-neutral-800 transition-text duration-300"

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center p-3 mt-5 transition-colors duration-300 border-t border-orange-300 bg-orange-300/50 dark:bg-sky-700 dark:border-sky-900">
      <div className="flex items-center justify-center">
        <div className="pr-3 text-xl text-neutral-800 dark:text-white">
          Ashley Thompson
        </div>
        <div className="flex items-center justify-center gap-3">
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
        </div>
      </div>
      <div className="mt-2 dark:text-slate-300 text-neutral-600">
        All rights reserved © 2023
      </div>
    </footer>
  )
}
