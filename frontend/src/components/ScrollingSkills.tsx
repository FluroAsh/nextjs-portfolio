import React, { useEffect, useState } from "react"
import clsx from "clsx"

// TODO: Create generator function for each skills (color + sublabel/name)
const SKILLS = [
  [
    {
      name: "React",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#61DAFB",
    },
    {
      name: "TypeScript",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#007ACC",
    },
    {
      name: "EmotionCSS",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#DB7093",
    },
  ],
  [
    {
      name: "TailwindCSS",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#38B2AC",
    },
    {
      name: "PostgreSQL",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#336791",
    },
    {
      name: "GraphQL",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#E10098",
    },
    // some other skills...
  ],
  [
    {
      name: "NodeJS",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#339933",
    },
    {
      name: "Prisma",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#1B222D",
    },
    {
      name: "NextJS",
      icon: <div className="w-16 h-16 bg-red-500" />,
      color: "#000000",
    },
    // some other skills...
  ],
]

// Generate an empty object for each row
SKILLS.forEach((row, index) => {
  for (let i = 0; i < index; i++) {
    row.unshift({ name: "", icon: <></>, color: "" })
  }
})

export const ScrollingSkills = () => {
  const [positionX, setPositionX] = useState<number>(0)
  const [positionY, setPositionY] = useState<number>(0) // TODO: Should be a negative of the skills container height

  // const positionClassName = clsx(
  //   `absolute translate-x-[${positionX}px] translate-y-[${positionY}px]`
  // )

  useEffect(() => {
    // const skillsContainer = document.getElementById("skills")

    const id = setInterval(() => {
      setPositionX((prev) => prev + 0.2)
      setPositionY((prev) => prev + 0.2)

      // TODO: Get the height of the div &
      if (positionY >= 320 + 85) {
        console.log(positionX)
        setPositionX(0)
        setPositionY(0)
      }
    }, 10)

    return () => clearInterval(id)
  }, [positionX, positionY])

  // const skillsClassName = clsx(positionClassName, "absolute")
  // const skillsClassName = clsx(
  //   " grid grid-row-auto grid-cols-3",
  //   positionClassName
  // )

  return (
    //
    <div className="relative mx-auto overflow-hidden w-100 bg-slate-400 h-80 xl:mx-5">
      <div>
        <div
          id="skills-container"
          // -left-[470px] -top-[140px]
          className="absolute flex flex-wrap gap-3 justify-center origin-top-left -left-[470px] -top-[140px]"
          style={{
            // transform: `translateX(${positionX}px) translateY(${positionY}px) rotateZ(-45deg) rotateX(20deg) skewX(-20deg) translateZ(0px)`,
            transform: `translateX(${positionX}px) translateY(${positionY}px) rotateX(20deg) rotateZ(-15deg) skewX(20deg) translateZ(0px)`,
          }}
        >
          {/* TODO: Should use an intersection observer to start/stop the effect */}
          {SKILLS.map((row, idx) => (
            <div id={`row-${idx + 1}`} className="flex w-3/5 gap-3 ">
              {row.map(({ name, icon, color }) => (
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-lg hover:scale-125 transition-transform hover:text-lg select-none ${
                    color ? "shadow-lg" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  <span className="w-full px-2 text-center whitespace-break-spaces">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Blurred Transition Edges */}
        <div className="absolute top-0 left-0 w-32 h-full pointer-events-none bg-gradient-to-r from-slate-300/60 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full pointer-events-none bg-gradient-to-l from-slate-300/60 to-transparent" />
      </div>
    </div>
  )
}
