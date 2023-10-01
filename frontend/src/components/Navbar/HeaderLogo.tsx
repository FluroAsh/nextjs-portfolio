import Link from "next/link"
import clsx from "clsx"

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={clsx(className, "text-3xl tracking-wide font-yellowtail")}
    >
      <div className="text-orange-500 dark:text-sky-500">
        <span className="text-neutral-800 dark:text-white">a</span>
        <span>|thompson</span>
      </div>
    </Link>
  )
}

export default HeaderLogo
