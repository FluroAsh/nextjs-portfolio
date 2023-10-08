import { calculateDarkValues } from "lib/utils"

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
    borderColor: `rgb(${number}, ${number}, ${number})`
    text: `rgb(${number}, ${number}, ${number})`
  }
}

// Darken by % values — (eg: border by 10%, text by 70%)
const DARKEN_FACTOR = {
  border: 0.9,
  text: 0.3,
}

// Generate the rgba values based on the values from the `COLORS` object
export const SKILL_COLORS = Object.entries(COLORS).reduce(
  (acc, [skill, baseColor]) => {
    const r = Math.floor(parseInt(baseColor.slice(1, 3), 16))
    const g = Math.floor(parseInt(baseColor.slice(3, 5), 16))
    const b = Math.floor(parseInt(baseColor.slice(5, 7), 16))

    const borderColor = calculateDarkValues(r, g, b, DARKEN_FACTOR.border, {
      isBorder: true,
    })
    const textColor = calculateDarkValues(r, g, b, DARKEN_FACTOR.text, {
      isText: true,
    })

    return {
      ...acc,
      [skill]: {
        fill: baseColor,
        borderColor,
        text: textColor,
      },
    }
  },
  {} as SkillColors
)
