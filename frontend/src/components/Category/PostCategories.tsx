import type { CategoryAttributes } from "types/blog-types"

import { Category } from "./Category"

export const PostCategories: React.FC<{
  categoryData: CategoryAttributes[]
}> = ({ categoryData }) => {
  return (
    <div className="flex gap-2 my-1 text-orange-600 dark:text-sky-400 md:text-lg">
      {/* TODO: Replace with FA Icon/SVG */}#
      {categoryData.map(({ attributes }) => (
        <Category
          key={attributes.slug}
          name={attributes.name}
          slug={attributes.slug}
        />
      ))}
    </div>
  )
}
