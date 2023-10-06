import Link from "next/link"
import clsx from "clsx"

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={clsx(className, "text-3xl tracking-wide font-yellowtail")}
    >
      <div className="transition-colors duration-300 text-slate-300 dark:text-sky-500">
        <span className="text-slate-100 dark:text-white">a</span>
        <span>|thompson</span>
      </div>
    </Link>
  )
}

export default HeaderLogo
