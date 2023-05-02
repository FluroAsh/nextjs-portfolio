import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface IButton {
  href: string
  children: JSX.Element | string
  className?: string
  type?: 'link' | 'back'
}

const Button: React.FC<IButton> = ({
  href,
  children,
  className,
  type = 'link'
}) => {
  const buttonStyles = (type: IButton['type']) => {
    if (type === 'link') {
      return `p-2 px-4 border border-black hover:text-white rounded-md hover:border-orange-300 bg-gradient-to-r hover:to-orange-500 hover:from-orange-600 
      dark:border-white dark:hover:to-sky-600 dark:hover:from-sky-700  dark:hover:border-sky-300 hover:shadow-lg`
    }

    if (type === 'back') {
      return ``
    }
  }

  return (
    <button type="button">
      <Link href={href}>
        <div className={clsx(buttonStyles(type), className)}>{children}</div>
      </Link>
    </button>
  )
}

export default Button
