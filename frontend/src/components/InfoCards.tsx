import {
  faCloudBinary,
  faCode,
  faGraduationCap,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

const iconStyles =
  "absolute top-5 left-5 w-[8rem] h-[8rem] fill-slate-300 opacity-10  "

const INFO_CARDS = [
  {
    heading: "Technology",
    text: (
      <p>
        Becoming interested in tech from an early age, the first foray into the
        field was messing around with a hand-me-down computer in a Windows
        terminal for hours at a time, or seeing how packets flow through the
        internet after running a traceroute and playing around with the latest
        gadgets. Today I like to try and find cool little projects I can pick
        up. I&apos;m currently working on a Raspberry Pi project to monitor
        temperature and humidity in my home office and send me a notification if
        it gets too hot or humid so I can stay productive throughout the day.
      </p>
    ),
    icon: <FontAwesomeIcon icon={faCloudBinary} className={iconStyles} />,
    className: "sm:col-span-2 col-span-1 lg:col-span-1",
  },
  {
    heading: "Web Development",
    text: (
      <p>
        I haven&apos;t trodded the standard developer pathway with a formal
        education in Computer science or anything like that. My passion for Web
        Development started with hours as a kid inspecting web pages, trying to
        figure out how they work. More recently though, I completed a Full Stack
        Coding Bootcamp with Coder Academy. I now work as a Frontend Developer
        for Myer, pursuing my passion for web development, and working on side
        projects outside of work to explore new technologies and ways of
        thinking!
      </p>
    ),
    icon: <FontAwesomeIcon icon={faCode} className={iconStyles} />,
  },
  {
    heading: "Learner",
    text: (
      <p>
        I began my formal learning journey studying Business Information Systems
        at the University of Swinburne. It wasn&apos;t until 3 years later that
        I got the programming bug, and switched gears into web development. I
        touched on a lot of technologies, and even a bit of SQL but ultimately
        my formal education did not lead me down a path I was truly passionate
        about until I took the plunge and completed the Coder Academy Full Stack
        Bootcamp in 2022. But the learning doesn&apos;t stop there! I&apos;m
        always looking for new ways to learn and grow as a developer.
      </p>
    ),
    icon: <FontAwesomeIcon icon={faGraduationCap} className={iconStyles} />,
  },
]

export const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 auto-rows-auto sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
      {INFO_CARDS.map(({ heading, text, icon, className }, idx) => (
        <div
          key={`info-${idx}`}
          className={clsx(
            className,
            "relative p-5 rounded-md bg-gradient-to-tr to-slate-500 from-slate-600 whitespace-break-spaces shadow-lg"
          )}
        >
          <h1 className="mb-2 text-xl tracking-wide text-center">{heading}</h1>
          <div className="text-sm leading-normal text-neutral-100">{text}</div>
          {icon}
        </div>
      ))}
    </div>
  )
}
