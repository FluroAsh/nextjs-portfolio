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
      return `p-2 px-4 border text-neutral-700 hover:text-white rounded-sm font-semibold tracking-wide border-neutral-600
      bg-gradient-to-r hover:from-sky-700 hover:to-sky-600 hover:border-sky-300 hover:shadow-lg dark:hover:border-sky-300 dark:border-white dark:text-white`
    }

    // TODO: Add more button types/styles
    if (type === "back") {
      return ``
    }

    if (type === "text") {
      return cn(
        "transition text-neutral-700 hover:text-sky-600 font-semibold tracking-wide",
        "dark:text-white dark:hover:text-sky-600"
      )
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
