import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface ILinkButton {
  link: string
  children: JSX.Element | string
  className?: string
}

const LinkButton: React.FC<ILinkButton> = ({ link, children, className }) => {
  return (
    <button type="button">
      <Link href={link}>
        <div
          className={clsx(
            className,
            `p-2 px-4 border border-black hover:text-white rounded-md hover:border-orange-300 bg-gradient-to-r hover:to-orange-500 hover:from-orange-600 
            dark:border-white dark:hover:to-sky-600 dark:hover:from-sky-700  dark:hover:border-sky-300 hover:shadow-lg`
          )}
        >
          {children}
        </div>
      </Link>
    </button>
  )
}

export default LinkButton
