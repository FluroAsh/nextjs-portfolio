import { useState, useEffect } from 'react'

export default function useScrolling() {
  const [isScrolling, setScrolling] = useState<boolean>(false)
  const MIN_SCROLL_HEIGHT = 20

  const checkScrolling = () => setScrolling(window.scrollY > MIN_SCROLL_HEIGHT)

  useEffect(() => {
    window.addEventListener('scroll', checkScrolling)
    return () => {
      window.removeEventListener('scroll', checkScrolling)
    }
  }, [])

  return [isScrolling]
}
