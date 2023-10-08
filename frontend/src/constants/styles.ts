export const COLORS = {
  React: "#61DAFB",
  TypeScript: "#007ACC",
  EmotionCSS: "#DB7093",
  TailwindCSS: "#38B2AC",
  PostgreSQL: "#336791",
  GraphQL: "#E10098",
  NGINX: "#009639",
  Docker: "#2496ED",
  AWS: "#FF9900",
  NodeJS: "#339933",
  Prisma: "#1B222D",
  NextJS: "#000000",
  SCSS: "#CC6699",
  ROR: "#CC0000",
  ExpressJS: "#000000",
  Bootstrap: "#7952B3",
} as const

type SkillColors = {
  [K in keyof typeof COLORS]: {
    fill: (typeof COLORS)[K]
    borderColor: `rgba(${number}, ${number}, ${number}, 0.9)`
  }
}

const BORDER_OPACITY = 0.9
const DARKEN_FACTOR = 0.9

// Generate the rgba values based on the values from the `COLORS` object
export const SKILL_COLORS = Object.entries(COLORS).reduce(
  (acc, [skill, baseColor]) => {
    const r = Math.floor(parseInt(baseColor.slice(1, 3), 16) * DARKEN_FACTOR)
    const g = Math.floor(parseInt(baseColor.slice(3, 5), 16) * DARKEN_FACTOR)
    const b = Math.floor(parseInt(baseColor.slice(5, 7), 16) * DARKEN_FACTOR)

    const borderColor = `rgba(${r}, ${g}, ${b}, ${BORDER_OPACITY})`

    return {
      ...acc,
      [skill]: {
        fill: baseColor,
        borderColor,
      },
    }
  },
  {} as SkillColors
)
