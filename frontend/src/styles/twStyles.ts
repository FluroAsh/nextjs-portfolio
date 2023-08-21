type themeType = "dark" | "light"

export const h1Anchor = (theme: any, type: themeType) => ({
  scrollMarginTop: "calc(var(--navbar-height) + 10px)",
  color:
    type === "dark" ? theme("colors.neutral.300") : theme("colors.orange.500"),

  ".anchor": {
    transition: "all 150ms ease-out",
    opacity: "100%",
    borderBottom: "2px solid transparent",

    "&:hover": {
      color:
        type === "dark" ? theme("colors.sky.500") : theme("colors.orange.500"),
      opacity: "70%",
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
    color:
      type === "dark"
        ? theme("colors.neutral.300")
        : theme("colors.orange.500"),
    transition: " 150ms ease-out",
    opacity: "100%",
    borderBottom: "2px solid transparent",

    "&:hover": {
      color:
        type === "dark" ? theme("colors.sky.500") : theme("colors.orange.500"),
      opacity: "50%",
      borderBottom: "2px solid currentColor",
    },
  },
})
