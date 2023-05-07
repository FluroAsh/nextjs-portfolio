import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const HeaderLogo = ({ className }: { className: string }) => {
  const halfLogoWidth = 59.15
  return (
    <Link
      href="/"
      className={clsx(
        className,
        `mr-[${halfLogoWidth}px] sm:mr-2 text-2xl font-thin`
      )}
    >
      <div className="text-orange-500 drop-shadow-lg dark:text-sky-500 font-extralight">
        <span className="text-black dark:text-white">a</span>
        |thompson
      </div>
    </Link>
  )
}

export default HeaderLogo
