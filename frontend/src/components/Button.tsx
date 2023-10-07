import Link from "next/link"

import { cn } from "lib/utils"

type ButtonProps = {
  title?: string
  href: string
  children: React.ReactNode
  className?: string
  type?: "link" | "back" | "text"
}

// TODO: Refactor this component to use CVA/a better approach with
// the different conditional props/styles
const Button: React.FC<ButtonProps> = ({
  title,
  href,
  children,
  className,
  type = "link",
}) => {
  const buttonStyles = (type: ButtonProps["type"]) => {
    if (type === "link") {
      return `p-2 px-4 border border-black hover:text-white rounded-md hover:border-orange-300 bg-gradient-to-r hover:to-orange-500 hover:from-orange-600 
      dark:border-white dark:hover:to-sky-600 dark:hover:from-sky-700 dark:hover:border-sky-300 hover:shadow-lg`
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
    <button type="button" className={className}>
      <Link
        title={title}
        href={href}
        className={cn("block", buttonStyles(type))}
      >
        {children}
      </Link>
    </button>
  )
}

export default Button
