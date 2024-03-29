import React, { useEffect, useState } from "react"
import { COLOR_PROPERTIES, type ColorName } from "constants/styles"

import useIntersection from "hooks/useIntersection"

import { cn } from "lib/utils"

type Skills = (ColorName | "")[][]

const skillsList: Skills = [
  ["React", "TypeScript", "EmotionCSS"],
  ["TailwindCSS", "PostgreSQL", "GraphQL"],
  ["NGINX", "Docker", "AWS"],
  ["NodeJS", "Prisma", "NextJS"],
  // Add other skills as needed
]

const SKILLS: Skills = [
  // Deep clone required to avoid mutating the reference array with row.unshift("")
  ...JSON.parse(JSON.stringify(skillsList)),
  ...JSON.parse(JSON.stringify(skillsList)),
]

// Generate the empty cells for each row to provide spacing
SKILLS.forEach((row, index) => {
  for (let i = 0; i < index; i++) {
    row.unshift("")
  }
})

/* TODO: Should use an intersection observer to start/stop the effect */
const skillRows = SKILLS.map((row, idx) => (
  <div
    key={`row-${idx + 1}`}
    id={`row-${idx + 1}`}
    className="flex w-[1500px] gap-3"
  >
    {row.map((label, idx) => (
      <div
        key={`${label}-${idx}`}
        className={cn(
          "flex items-center justify-center w-32 h-32 rounded-lg hover:scale-110 transition select-none",
          "hover:text-lg text-white text-md hover:brightness-110",
          label ? "shadow-lg border-4" : "border-2 border-transparent"
        )}
        style={{
          backgroundColor: label ? COLOR_PROPERTIES[label].fill : "transparent",
          borderColor: label
            ? COLOR_PROPERTIES[label].borderColor
            : "transparent",
        }}
      >
        <span className="w-full px-2 text-center whitespace-break-spaces">
          {label}
        </span>
      </div>
    ))}
  </div>
))

// TODO: Add an intersection observer to stop the animation when the user scrolls past this component
export const ScrollingSkills = () => {
  const [positionX, setPositionX] = useState<number>(0)
  const [positionY, setPositionY] = useState<number>(0)

  const { isVisible, containerRef } = useIntersection({
    root: null,
    rootMargin: "8px",
    threshold: 0,
  })

  const END_Y = 394

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout

    const startAnimation = () => {
      scrollTimer = setInterval(() => {
        setPositionX((prev) => prev + 2.045)
        setPositionY((prev) => prev + 1)

        if (positionY >= END_Y) {
          setPositionX(8)
          setPositionY(4)
        }
      }, 16)
    }

    const stopAnimation = () => clearInterval(scrollTimer)

    if (isVisible) startAnimation()
    else stopAnimation()

    return () => clearInterval(scrollTimer)
  }, [isVisible, positionX, positionY])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto overflow-hidden shadow-lg xl:rounded-lg w-100 h-80 xl:mx-5 bg-gradient-to-tr",
        "to-neutral-100 via-neutral-200 from-neutral-300",
        "dark:to-slate-500 dark:via-slate-600 dark:from-slate-700 "
      )}
    >
      <div
        id="skills-container"
        className="absolute flex flex-wrap justify-center gap-3 origin-top-left -left-[1200px] -top-[350px] will-change-transform"
        style={{
          transform: `translateX(${positionX}px) translateY(${positionY}px) rotateX(25deg) rotateZ(-10deg) skewX(15deg) translateZ(0px)`,
        }}
        // ref={containerRef}
      >
        {skillRows}
      </div>
      {/* Blurred Transition Edges */}
      <div className="absolute top-0 left-0 w-32 h-full pointer-events-none bg-gradient-to-r from-neutral-300/50 dark:from-slate-700/60 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-full pointer-events-none bg-gradient-to-l from-neutral-300/50 dark:from-slate-700/60 to-transparent" />
    </div>
  )
}
