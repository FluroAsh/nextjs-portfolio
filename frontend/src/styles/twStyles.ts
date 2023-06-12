export const h1Anchor = {
  scrollMarginTop: "calc(var(--navbar-height) + 10px)",

  "> a": {
    position: "relative",
    top: "1px",
    transition: "opacity 150ms ease-out",
    opacity: "100%",
    marginLeft: "8px",

    "&:hover": {
      opacity: "50%",
      textDecoration: "none",
    },
  },
}

export const pre = (theme: any, type: "dark" | "light") => {
  const defaults = {
    borderRadius: theme("borderRadius.md"),
    borderWidth: theme("borderWidth.2"),
    maxWidth: "100%",
    overflowX: "auto",
    /** Remove Prose defaults */
    backgroundColor: null,
    paddingLeft: null,
    paddingRight: null,
    paddingTop: null,
    paddingBottom: null,
  }

  const lightStyle = {
    ...defaults,
    borderColor: "transparent",
    boxShadow: theme("boxShadow.lg"),
  }

  const darkStyle = {
    ...defaults,
    boxShadow: theme("boxShadow.md"),
    borderColor: "hsla(218, 13%, 40%, 0.5)", // equivalent to slate.500/50
  }
  return type === "dark" ? darkStyle : lightStyle
}

export const commonStyles = {
  h1: h1Anchor,
  a: {
    transition: "150ms opacity ease-in-out",
    opacity: "100%",
    textDecoration: "none",
    "&:hover": {
      opacity: "50%",
      textDecoration: "underline",
    },
  },
}
