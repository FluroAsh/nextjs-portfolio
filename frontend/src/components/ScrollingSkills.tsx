import { useEffect, useRef, useState } from "react"

// TODO: Create generator function for each skills (color + sublabel/name)
// This will be used for the icons which will be inset and fixed
// Labels to appear centered on the bottom of the tile
const SkillIcon = () => <div className="w-16 h-16 bg-red-500"></div>

const SKILLS = [
  [
    { label: "React", color: "#61DAFB" },
    { label: "TypeScript", color: "#007ACC" },
    { label: "EmotionCSS", color: "#DB7093" },
  ],
  [
    { label: "TailwindCSS", color: "#38B2AC" },
    { label: "PostgreSQL", color: "#336791" },
    { label: "GraphQL", color: "#E10098" },
  ],
  [
    { label: "NGINX", color: "#009639" },
    { label: "Docker", color: "#2496ED" },
    { label: "AWS", color: "#FF9900" },
  ],
  [
    { label: "NodeJS", color: "#339933" },
    { label: "Prisma", color: "#1B222D" },
    { label: "NextJS", color: "#000000" },
    // some other skills...
  ],
  // Placeholders to test the animation
  [
    { label: "React", color: "#61DAFB" },
    { label: "TypeScript", color: "#007ACC" },
    { label: "EmotionCSS", color: "#DB7093" },
  ],
  [
    { label: "TailwindCSS", color: "#38B2AC" },
    { label: "PostgreSQL", color: "#336791" },
    { label: "GraphQL", color: "#E10098" },
  ],
  [
    { label: "NGINX", color: "#009639" },
    { label: "Docker", color: "#2496ED" },
    { label: "AWS", color: "#FF9900" },
  ],
  [
    { label: "NodeJS", color: "#339933" },
    { label: "Prisma", color: "#1B222D" },
    { label: "NextJS", color: "#000000" },
    // some other skills...
  ],
]

// Generate empty object(s) for each row based on index
SKILLS.forEach((row, index) => {
  for (let i = 0; i < index; i++) {
    row.unshift({ label: "", color: "" })
  }
})

/* TODO: Should use an intersection observer to start/stop the effect */
const skillRows = SKILLS.map((row, idx) => (
  <div
    key={`row-${idx + 1}`}
    id={`row-${idx + 1}`}
    className="flex w-[1500px] gap-3"
  >
    {row.map(({ label, color }, idx) => (
      <div
        key={`${label}-${idx}`}
        className={`flex items-center justify-center w-32 h-32 rounded-lg hover:scale-110 transition-transform hover:text-lg select-none ${
          color ? "shadow-lg" : ""
        }`}
        style={{ backgroundColor: color }}
      >
        <span className="w-full px-2 text-center whitespace-break-spaces">
          {label}
        </span>
      </div>
    ))}
  </div>
))

export const ScrollingSkills = () => {
  const [positionX, setPositionX] = useState<number>(0)
  const [positionY, setPositionY] = useState<number>(0) // TODO: Should be a negative of the skills container height

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const END_Y = 394

    const id = setInterval(() => {
      setPositionX((prev) => prev + 2.045)
      setPositionY((prev) => prev + 1)

      if (positionY >= 394) {
        // Reset animation
        setPositionX(8)
        setPositionY(4)
      }
    }, 8)

    return () => clearInterval(id)
  }, [positionX, positionY])

  return (
    <div className="relative mx-auto overflow-hidden w-100 bg-slate-400 h-80 xl:mx-5">
      <div
        id="skills-container"
        // -bottom-24
        className="absolute flex flex-wrap justify-center gap-3 origin-top-left -left-[1200px] -top-[350px] will-change-transform"
        style={{
          transform: `translateX(${positionX}px) translateY(${positionY}px) rotateX(25deg) rotateZ(-10deg) skewX(15deg) translateZ(0px)`,
        }}
        ref={containerRef}
      >
        {skillRows}
      </div>
      {/* Blurred Transition Edges */}
      <div className="absolute top-0 left-0 w-32 h-full pointer-events-none bg-gradient-to-r from-slate-300/60 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-full pointer-events-none bg-gradient-to-l from-slate-300/60 to-transparent" />
    </div>
  )
}
