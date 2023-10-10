type themeType = "dark" | "light"

export const h1Anchor = (theme: any, type: themeType) => ({
  scrollMarginTop: "calc(var(--navbar-height) + 20px)",

  ".anchor": {
    position: "relative",
    color:
      type === "dark" ? theme("colors.white") : theme("colors.neutral.700"),
    transition: "all 150ms ease-out",
    fontWeight: 700,

    "&:hover": {
      color: theme("colors.sky.600"),
      borderBottom: "2px solid currentColor",
    },
  },
})

export const pre = (theme: any, type: themeType) => ({
  borderRadius: theme("borderRadius.md"),
  borderWidth: theme("borderWidth.2"),
  borderColor: type === "dark" ? "hsla(218, 13%, 40%, 0.5)" : "transparent",
  boxShadow: type === "dark" ? theme("boxShadow.md") : theme("boxShadow.lg"),
  maxWidth: "100%",
  overflowX: "auto",
  // Remove Prose defaults
  backgroundColor: null,
  paddingLeft: null,
  paddingRight: null,
  paddingTop: null,
  paddingBottom: null,
})

export const commonStyles = (theme: any, type: themeType) => ({
  a: {
    textDecoration: "none",
  },

  "p > a": {
    color: theme("colors.sky.500"),
    transition: " 150ms ease-out",
    borderBottom: "2px solid transparent",
    fontWeight: 700,

    "&:hover": {
      color: theme("colors.sky.400"),
      borderBottom: "2px solid currentColor",
    },
  },
})
