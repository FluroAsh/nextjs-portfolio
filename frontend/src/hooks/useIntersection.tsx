import { useEffect, useRef, useState } from "react"

export default function useIntersection(options: IntersectionObserverInit) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      setIsVisible(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)
    containerRef.current && observer.observe(containerRef.current)

    return () => {
      containerRef.current && observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  return { containerRef, isVisible }
}
