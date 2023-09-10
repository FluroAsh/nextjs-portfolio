import {
  faCloudBinary,
  faCode,
  faGraduationCap,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

const iconStyles =
  "absolute top-5 left-5 fill-slate-100 w-[8rem] h-[8rem] opacity-10"

const INFO_CARDS = [
  {
    heading: "Technology",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: <FontAwesomeIcon icon={faCloudBinary} className={iconStyles} />,
    className: "sm:col-span-2 col-span-1 md:col-span-1",
  },
  {
    heading: "Web Development",
    text: "Lorem ipsum dolor sit amet,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: <FontAwesomeIcon icon={faCode} className={iconStyles} />,
  },
  {
    heading: "Learner",
    text: "I spent most of my life interested in Technology, eventually studying Business at the University of Swinburne with a major in Information Sytems. It wasn't until 3 years later that I got the programming bug, and switched gears into web development — I haven't looked back since!",
    icon: <FontAwesomeIcon icon={faGraduationCap} className={iconStyles} />,
  },
]

export const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 gap-2 auto-rows-auto sm:grid-cols-2 md:grid-cols-3 md:grid-rows-1">
      {INFO_CARDS.map(({ heading, text, icon, className }, idx) => (
        <div
          key={`info-${idx}`}
          className={clsx(
            className,
            "relative p-5 rounded-md shadow-md bg-slate-500 whitespace-break-spaces border-2 border-slate-400"
          )}
        >
          <h1 className="mb-2 text-xl tracking-wide text-center">{heading}</h1>
          <div className="text-sm">{text}</div>
          {icon}
        </div>
      ))}
    </div>
  )
}
