import { cn } from "lib/utils"

import type { Heading } from "./TableOfContents"

export const HeadingLink = ({ id, text, level }: Heading) => (
  <li
    className={cn(
      level === 2 && "font-semibold mt-[2px]",
      "text-sky-600 dark:text-sky-500 hover:text-sky-500",
      "dark:hover:text-sky-400 transition-colors duration-200 py-[1.5px]"
    )}
  >
    <a
      draggable={false}
      href={`#${id}`}
      className={cn(level > 2 && "pl-4", "block truncate")}
    >
      {text}
    </a>
  </li>
)
