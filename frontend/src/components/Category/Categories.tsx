import type { CategoryAttributes } from "types/blog-types"

import { Category } from "./Category"

export const Categories: React.FC<{ categoryData: CategoryAttributes[] }> = ({
  categoryData,
}) => {
  return (
    <div className="flex gap-2 mt-1 mb-2 text-orange-600 dark:text-sky-400">
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
