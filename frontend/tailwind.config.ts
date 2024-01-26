import { fontFamily } from "tailwindcss/defaultTheme"
import type { Config } from "tailwindcss/types/config"

import * as twS from "./src/styles/twStyles"

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ptSans: ["var(--font-pt-sans)", ...fontFamily.sans],
        yellowtail: ["var(--font-yellowtail)", ...fontFamily.serif],
        sans: ["var(--pt-sans)", ...fontFamily.sans],
      },
      screens: {
        xs: { max: "400px" },
      },
      colors: {
        dark: {
          background: {
            primary: "#2d373c",
          },
        },
      },
      spacing: {
        "navbar-height": "var(--navbar-height)",
        "logo-spacing": "calc(50vw - 92px)",
      },
      height: {
        "-navbar": "calc(100vh - var(--navbar-height))",
        navbar: "var(--navbar-height)",
      },
      // For over-riding/customising
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            ...twS.commonStyles(theme, "light"),
          },
        },
        dark: {
          css: {
            ...twS.commonStyles(theme, "dark"),
          },
        },
      }),
      keyframes: {
        "back-and-forth": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-8px)" },
        },
      },
      animation: {
        "back-and-forth": "back-and-forth 1s ease-in-out infinite alternate",
      },
    },
  },
  variants: {
    extend: { typography: ["dark"] },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config
