import Link from "next/link"
import clsx from "clsx"

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={clsx(className, "text-2xl")}>
      <div className="font-light text-orange-500 dark:text-sky-500">
        <span className="text-neutral-800 dark:text-white">a</span>
        <span className="mx-[1px] font-extralight">|</span>
        <span className="">thompson</span>
      </div>
    </Link>
  )
}

export default HeaderLogo
