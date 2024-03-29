import Link from "next/link"

import { cn } from "lib/utils"

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        className,
        "text-3xl tracking-wide font-yellowtail whitespace-nowrap"
      )}
    >
      <div className="transition-colors duration-300 text-sky-500">
        <span className="text-neutral-100 dark:text-white">a</span>
        <span>|thompson</span>
      </div>
    </Link>
  )
}

export default HeaderLogo
