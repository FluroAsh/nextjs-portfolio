import { useEffect, useState } from "react"

export default function useScrolling(minScrollHeight: number = 20) {
  const [isScrolling, setScrolling] = useState<boolean>(false)

  useEffect(() => {
    const checkScrolling = () => setScrolling(window.scrollY > minScrollHeight)
    window.addEventListener("scroll", checkScrolling)
    return () => {
      window.removeEventListener("scroll", checkScrolling)
    }
  }, [minScrollHeight])

  return [isScrolling]
}
