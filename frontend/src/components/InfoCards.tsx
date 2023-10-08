import Link from "next/link"
import {
  faCloudBinary,
  faCode,
  faGraduationCap,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { externalLinkProps } from "constants/links"

import { cn } from "lib/utils"

const iconStyles =
  "absolute top-5 left-5 w-[8rem] h-[8rem] text-neutral-500 dark:text-slate-300 opacity-10  "

const INFO_CARDS = [
  {
    heading: "Technology",
    text: (
      <>
        <p>
          Becoming interested in tech from an early age, my first foray into
          technology as a hobby was messing around with hand-me-down computers
          for hours at a time, and seeing how packets flow through the Internet
          while running a traceroute and playing around with the latest gadgets.
          Today I like to try and find cool little projects I can pick up.
        </p>
        <p className="pt-2">
          I&apos;m currently working on a Raspberry Pi project to monitor
          temperature and humidity in my home office and send me a notification
          if it gets too hot or humid so I can stay productive throughout the
          day.
        </p>
      </>
    ),
    icon: <FontAwesomeIcon icon={faCloudBinary} className={iconStyles} />,
    className: "sm:col-span-2 col-span-1 lg:col-span-1",
  },
  {
    heading: "Web Development",
    text: (
      <>
        <p>
          I haven&apos;t trodded the standard developer pathway with a formal
          education in Computer science or anything like that. My passion for
          Web Development started with hours as a kid inspecting web pages,
          trying to figure out how they work.
        </p>
        <p className="pt-2">
          More recently though, I completed a Full Stack Coding Bootcamp with{" "}
          <Link
            href="https://coderacademy.edu.au/"
            className="font-semibold transition duration-300 text-sky-500 hover:text-sky-400"
            {...externalLinkProps}
          >
            Coder Academy.
          </Link>{" "}
          I now work as a Frontend Developer for Myer, pursuing my passion for
          web development, and working on side projects outside of work to
          explore new technologies and ways of thinking!
        </p>
      </>
    ),
    icon: <FontAwesomeIcon icon={faCode} className={iconStyles} />,
  },
  {
    heading: "Learner",
    text: (
      <>
        <p>
          I began my formal learning journey studying Business Information
          Systems at the University of Swinburne. It wasn&apos;t until 3 years
          later that I got the programming bug, and switched gears into web
          development. I touched on a lot of technologies, and even a bit of SQL
          but ultimately my formal education did not lead me down a path I was
          truly passionate about until I took the plunge and completed the Coder
          Academy Full Stack Bootcamp in 2022.
        </p>
        <p className="pt-2">
          But the learning doesn&apos;t stop there! I&apos;m always looking for
          new ways to learn and grow as a developer in various different parts
          of the stack.
        </p>
      </>
    ),
    icon: <FontAwesomeIcon icon={faGraduationCap} className={iconStyles} />,
  },
]

export const InfoCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
      {INFO_CARDS.map(({ heading, text, icon, className }, idx) => (
        <div
          key={`info-${idx}`}
          className={cn(
            className,
            "relative p-5 rounded-md whitespace-break-spaces shadow-lg overflow-hidden bg-gradient-to-tr",
            "to-neutral-300 from-neutral-200 dark:to-slate-500 dark:from-slate-600"
          )}
          tabIndex={0}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20" />
          <h1 className="mb-2 text-2xl tracking-wide text-center dark:text-white">
            {heading}
          </h1>
          <div className="leading-normal text-center text-md lg:text-sm text-neutral-600 dark:text-neutral-100">
            {text}
          </div>
          {icon}
        </div>
      ))}
    </div>
  )
}
