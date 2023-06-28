import type { CategoryAttributes } from "types/blog-types"

import { CategoryTag } from "./CategoryTag"

export const Categories: React.FC<{
  categoryData: CategoryAttributes[]
}> = ({ categoryData }) => {
  return (
    <div className="flex gap-2 my-2 text-orange-600 sm:my-0 sm:items-center dark:text-sky-400 md:text-lg">
      {/* TODO: Replace with FA Icon/SVG */}#
      {categoryData.map(({ attributes }) => (
        <CategoryTag
          key={attributes.slug}
          name={attributes.name}
          slug={attributes.slug}
        />
      ))}
    </div>
  )
}
