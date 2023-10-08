import Link from "next/link"
import { getSlugPath } from "constants/paths"

import { cn } from "lib/utils"

export const CategoryTag: React.FC<{ name: string; slug: string }> = ({
  name,
  slug,
}) => (
  <Link href={getSlugPath("category", slug)}>
    <div
      className={cn(
        "font-semibold tracking-wide uppercase transition-colors duration-300 text-sky-600 hover:text-sky-500",
        "dark:hover:text-sky-400 dark:text-sky-500 md:text-lg"
      )}
    >
      <span className="mr-[3px]">#</span>
      {name}
    </div>
  </Link>
)
