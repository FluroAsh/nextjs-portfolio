/** @type {import('tailwindcss').Config} */
import * as twS from "./src/styles/twStyles"

module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        "logo-spacing": "calc(50vw - 80px)",
      },
      height: {
        "-navbar": "calc(100vh - var(--navbar-height))",
        navbar: "var(--navbar-height)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: twS.h1Anchor,
            a: {
              ...twS.commonStyles.a,
              color: theme("colors.orange.400"),
            },
            pre: twS.pre(theme, "light"),
          },
        },
        dark: {
          css: {
            h1: twS.h1Anchor,
            a: {
              ...twS.commonStyles.a,
              color: theme("colors.sky.500"),
            },
            pre: twS.pre(theme, "dark"),
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
}
