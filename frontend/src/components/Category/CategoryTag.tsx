import Link from "next/link"

import type { CategoryAttributes } from "types/blog-types"

type CategoryTagProps = Omit<CategoryAttributes["attributes"], "description">

export const CategoryTag: React.FC<CategoryTagProps> = ({ name, slug }) => (
  <Link href={`/category/${slug}`}>
    <div className="font-semibold tracking-wide uppercase transition-opacity hover:opacity-80">
      {name}
    </div>
  </Link>
)
