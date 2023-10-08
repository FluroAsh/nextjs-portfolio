import { APICategory } from "types/api-types"

import { CategoryTag } from "./CategoryTag"

/** Returns the first 2 categories from a valid collection of categories. */
export const Categories: React.FC<{
  categoryData: APICategory[]
}> = ({ categoryData }) => {
  return (
    <div className="flex gap-2 my-2 sm:my-0 sm:items-center">
      {/* TODO: Replace with FA Icon/SVG */}
      {categoryData.slice(0, 2).map(({ attributes }) => (
        <CategoryTag
          key={attributes.slug}
          name={attributes.name}
          slug={attributes.slug}
        />
      ))}
    </div>
  )
}
