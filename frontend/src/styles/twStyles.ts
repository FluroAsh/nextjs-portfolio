type themeType = "dark" | "light"

const anchor = (theme: any, type: themeType) => ({
  scrollMarginTop: "calc(var(--navbar-height) + 20px)",

  ".anchor": {
    position: "relative",
    color:
      type === "dark" ? theme("colors.white") : theme("colors.neutral.700"),
    transition: "colors 150ms ease-out",
    fontWeight: 700,

    "&:hover": { color: theme("colors.sky.600") },
  },
})

const pre = (theme: any, type: themeType) => ({
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
  "p > a": {
    color: type === "dark" ? theme("colors.sky.500") : theme("colors.sky.600"),
    transition: " 150ms ease-out",
    fontWeight: 700,

    "&:hover": {
      color:
        type === "dark" ? theme("colors.sky.400") : theme("colors.sky.500"),
    },
  },

  "article p > img": {
    boxShadow: theme("boxShadow.lg"),
  },

  a: { textDecoration: "none" },

  "h2, h3": {
    ...anchor(theme, type),
    marginTop: theme("spacing.8"),
    marginBottom: theme("spacing.0"),
  },

  "h2 + p, h3 + p": {
    marginTop: theme("spacing.2"),
  },

  "article img": {
    margin: `${theme("spacing.6")} auto`,
  },

  "article > h2:first-child": {
    marginTop: 0,
  },

  pre: { ...pre(theme, type) },
})
