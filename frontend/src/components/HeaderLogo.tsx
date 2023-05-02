import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center mr-2 text-2xl font-thin">
      <div className="text-orange-500 drop-shadow-lg dark:text-sky-500">
        <span className="text-black dark:text-white">a</span>
        |thompson
      </div>
    </Link>
  )
}

export default HeaderLogo
