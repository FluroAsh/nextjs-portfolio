import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "constants/links"

import * as icon from "../static/icons"

const IconLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <div className="flex items-center">
    <a href={href} rel="noreferrer" target="_blank">
      {icon}
    </a>
  </div>
)

const iconStyles =
  "hover:dark:fill-slate-300 hover:fill-orange-400 dark:fill-white fill-neutral-800 transition-color duration-300"

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center p-3 mt-5 transition-colors duration-300 border-t border-orange-300 bg-orange-300/50 dark:bg-sky-700 dark:border-sky-900">
      <div className="flex items-center justify-center">
        <div className="mr-3 text-xl text-neutral-800 dark:text-white">
          Ashley Thompson
        </div>
        <div className="flex items-center justify-center gap-3">
          <IconLink
            href={TWITTER_URL}
            icon={<icon.Twitter className={iconStyles} />}
          />
          <IconLink
            href={LINKEDIN_URL}
            icon={<icon.LinkedIn className={iconStyles} />}
          />
          <IconLink
            href={GITHUB_URL}
            icon={<icon.GitHub className={iconStyles} />}
          />
        </div>
      </div>
      <div className="mt-2 dark:text-slate-300 text-neutral-600">
        All rights reserved © 2023
      </div>
    </footer>
  )
}
