/** @type {import('tailwindcss').Config} */

const preStyle = (theme, type) => {
  const defaults = {
    borderRadius: theme("borderRadius.md"),
    borderWidth: theme("borderWidth.2"),
    /** Remove Prose defaults */
    backgroundColor: null,
    paddingLeft: null,
    paddingRight: null,
    paddingTop: null,
    paddingBottom: null,
    maxWidth: "fit-content",
    overflowX: "auto",
  }

  const light = {
    ...defaults,
    borderColor: "transparent",
    boxShadow: theme("boxShadow.lg"),
  }
  const dark = {
    ...defaults,
    boxShadow: theme("boxShadow.md"),
    borderColor: "hsla(218, 13%, 40%, 0.5)", // equivalent to slate.500/50
  }

  return type === "dark" ? dark : light
}

const h1AnchorStyle = {
  scrollMarginTop: "calc(var(--navbar-height) + 10px)",

  "> a": {
    position: "relative",
    top: "1px",
    transition: "opacity 150ms ease-out",
    opacity: "100%",
    marginLeft: "8px",

    "&:hover": {
      opacity: "50%",
    },
  },
}

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
      /** Used mainly for the blog/[slug] prose CSS */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: h1AnchorStyle,
            a: {
              transition: "150ms color ease-in-out",
              textDecoration: "none",
              color: theme("colors.orange.400"),
              "&:hover": {
                color: theme("colors.orange.600"),
              },
            },
            h1: {
              marginBottom: theme("spacing.4"),
            },
            pre: preStyle(theme, "light"),
          },
        },
        dark: {
          css: {
            h1: h1AnchorStyle,
            a: {
              transition: "150ms color ease-in-out",
              textDecoration: "none",
              color: theme("colors.sky.500"),
              "&:hover": {
                color: theme("colors.sky.600"),
              },
            },
            pre: preStyle(theme, "dark"),
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
