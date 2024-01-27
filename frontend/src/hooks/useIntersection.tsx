import { useEffect, useRef, useState } from "react"

export default function useIntersection(options: IntersectionObserverInit) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const containerElement = containerRef.current

    const callback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      setIsVisible(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)
    containerElement && observer.observe(containerElement)

    return () => {
      containerElement && observer.unobserve(containerElement)
    }
  }, [containerRef, options])

  return { containerRef, isVisible }
}
