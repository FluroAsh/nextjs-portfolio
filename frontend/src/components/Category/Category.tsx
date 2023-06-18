import Link from "next/link"

import { CategoryAttributes } from "types/blog-types"

type CategoryProps = Pick<CategoryAttributes["attributes"], "name" | "slug">

export const Category: React.FC<CategoryProps> = ({ name, slug }) => {
  return (
    <Link href={`/category/${slug}`}>
      <div className="font-semibold uppercase transition-opacity hover:opacity-80">
        {name}
      </div>
    </Link>
  )
}
