import { useEffect, useState } from "react"

import useMounted from "./useMounted"

export default function useMediaQuery(query: string) {
  const mounted = useMounted()
  const [matches, setMatches] = useState(() =>
    mounted ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const media = window.matchMedia(query)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
