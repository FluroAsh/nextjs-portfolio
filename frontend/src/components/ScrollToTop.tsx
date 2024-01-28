import useScrolling from "hooks/useScrolling"

import { cn } from "lib/utils"

export const ScrollToTop = () => {
  const isScrolling = useScrolling(800)

  return (
    <div
      className={cn(
        isScrolling ? "opacity-100" : "opacity-0 pointer-events-none",
        "transition-opacity duration-250"
      )}
    >
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 flex justify-center items-center p-3 rounded-full shadow-lg bg-neutral-900 opacity-80"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
      >
        <span className="sr-only">Scroll to top</span>
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={48}
          height={48}
        >
          <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      </button>
    </div>
  )
}
