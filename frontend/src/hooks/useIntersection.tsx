import { useEffect, useRef, useState } from "react"

export default function useIntersection(options: IntersectionObserverInit) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const divElement = containerRef.current

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      setIsVisible(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)
    divElement && observer.observe(divElement)

    return () => {
      divElement && observer.unobserve(divElement)
    }
  }, [containerRef, options])

  return { containerRef, isVisible }
}
