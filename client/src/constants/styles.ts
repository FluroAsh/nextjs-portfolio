import { calculateDarkValues } from "lib/utils"

// This is used when matching the key to what we're getting back from the CMS
// Default should be used as a fallback where no color is specified
export const BASE_COLORS = {
  Default: "#000000",
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
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  Productivity: "#FF0000",
  Travel: "#3498db",
} as const

export type ColorName = keyof typeof BASE_COLORS

type ColorProperties = {
  [K in ColorName]: {
    fill: (typeof BASE_COLORS)[K]
    borderColor: `rgb(${number}, ${number}, ${number})`
    text: `rgb(${number}, ${number}, ${number})`
  }
}

// Darken by % values — (eg: border by 10%, text by 60%)
const DARKEN_FACTOR = {
  border: 0.9,
  text: 0.4,
}

// Generate the rgba values based on the values from the `COLORS` object
export const COLOR_PROPERTIES = Object.entries(BASE_COLORS).reduce(
  (acc, [label, hexColor]) => {
    const r = Math.floor(parseInt(hexColor.slice(1, 3), 16))
    const g = Math.floor(parseInt(hexColor.slice(3, 5), 16))
    const b = Math.floor(parseInt(hexColor.slice(5, 7), 16))

    const borderColor = calculateDarkValues(r, g, b, DARKEN_FACTOR.border, {
      isBorder: true,
    })
    const textColor = calculateDarkValues(r, g, b, DARKEN_FACTOR.text, {
      isText: true,
    })

    return {
      ...acc,
      [label]: {
        fill: hexColor,
        borderColor,
        text: textColor,
      },
    }
  },
  {} as ColorProperties
)
