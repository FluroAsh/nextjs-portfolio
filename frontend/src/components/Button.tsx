import React from "react"
import Link from "next/link"
import clsx from "clsx"

interface IButton {
  title?: string
  href: string
  children: JSX.Element[] | JSX.Element | string
  className?: string
  type?: "link" | "back" | "text"
}

const Button: React.FC<IButton> = ({
  title,
  href,
  children,
  className,
  type = "link",
}) => {
  const buttonStyles = (type: IButton["type"]) => {
    if (type === "link") {
      return `p-2 px-4 border border-black hover:text-white rounded-md hover:border-orange-300 bg-gradient-to-r hover:to-orange-500 hover:from-orange-600 
      dark:border-white dark:hover:to-sky-600 dark:hover:from-sky-700  dark:hover:border-sky-300 hover:shadow-lg`
    }

    // TODO: Add more button types/styles
    if (type === "back") {
      return ``
    }

    if (type === "text") {
      return ``
    }
  }

  return (
    <button type="button">
      <Link
        title={title}
        href={href}
        className={clsx("block", buttonStyles(type), className)}
      >
        {children}
      </Link>
    </button>
  )
}

export default Button
