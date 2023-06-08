import React from "react"
import Link from "next/link"
import clsx from "clsx"

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={clsx(className, "text-2xl font-thin")}>
      <div className="text-orange-500 drop-shadow-lg dark:text-sky-500 font-extralight">
        <span className="text-black dark:text-white">a</span>
        |thompson
      </div>
    </Link>
  )
}

export default HeaderLogo
