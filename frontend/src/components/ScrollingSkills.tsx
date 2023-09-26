import { useEffect, useRef, useState } from "react"
import { COLORS } from "constants/styles"

// TODO: Create generator function for each skills (color + sublabel/name)
// This will be used for the icons which will be inset and fixed
// Labels to appear centered on the bottom of the tile
const SkillIcon = () => <div className="w-16 h-16 bg-red-500"></div>

type Skills = (keyof typeof COLORS | "")[][]

const SKILLS: Skills = [
  ["React", "TypeScript", "EmotionCSS"],
  ["TailwindCSS", "PostgreSQL", "GraphQL"],
  ["NGINX", "Docker", "AWS"],
  ["NodeJS", "Prisma", "NextJS"],
  // Repeat the skills for duplicates
  ["React", "TypeScript", "EmotionCSS"],
  ["TailwindCSS", "PostgreSQL", "GraphQL"],
  ["NGINX", "Docker", "AWS"],
  ["NodeJS", "Prisma", "NextJS"],
  // Add other skills as needed
]

// Generate empty object(s) for each row based on index
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
        className={`flex items-center justify-center w-32 h-32 rounded-lg hover:scale-110 transition-transform hover:text-lg select-none ${
          label ? "shadow-lg" : ""
        }`}
        style={{ backgroundColor: label ? COLORS[label] : "transparent" }}
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

  // TODO: Refactor to use a ref and simplify this useEffect logic so it's scalable...
  // const containerRef = useRef<HTMLDivElement>(null)

  const END_Y = 394

  useEffect(() => {
    const id = setInterval(() => {
      setPositionX((prev) => prev + 2.045)
      setPositionY((prev) => prev + 1)

      if (positionY >= END_Y) {
        // Reset animation
        setPositionX(8)
        setPositionY(4)
      }
    }, 16)

    return () => clearInterval(id)
  }, [positionX, positionY])

  return (
    <div className="relative mx-auto overflow-hidden shadow-lg xl:rounded-lg w-100 dark:bg-gradient-to-tr dark:to-slate-500 dark:via-slate-600 dark:from-slate-700 h-80 xl:mx-5">
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
      <div className="absolute top-0 left-0 w-32 h-full pointer-events-none bg-gradient-to-r from-slate-700/60 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-full pointer-events-none bg-gradient-to-l from-slate-700/60 to-transparent" />
    </div>
  )
}
