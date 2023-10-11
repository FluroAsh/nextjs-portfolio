import Link from "next/link"
import { getSlugPath } from "constants/paths"

import type { APICategory, PostAttributes } from "types/api-types"
import { BlogDetails, BlogImage } from "components/Blog"
import Button from "components/Button"

import { cn } from "lib/utils"

const BlogPreview: React.FC<{
  attributes: PostAttributes
  categoryData: APICategory[]
  type: "tile" | "text"
  className?: string
}> = ({ attributes, categoryData, type, className: extraStyles }) => {
  const { slug, title, description, createdAt } = attributes
  const { alternativeText, formats } = attributes.cover.data.attributes

  return type === "text" ? (
    <div
      className={cn(
        "py-4 border-b dark:border-slate-500 border-neutral-600",
        extraStyles
      )}
    >
      <BlogDetails
        slug={slug}
        title={title}
        description={description}
        createdAt={createdAt}
        categoryData={categoryData}
      />

      <Button
        href={getSlugPath("blog", slug)}
        className="w-full mt-4 mb-2 sm:w-40"
        type="link"
      >
        Read more &rarr;
      </Button>
    </div>
  ) : (
    <div className={cn(extraStyles)}>
      <Link href={getSlugPath("blog", slug)}>
        <BlogImage alt={alternativeText} formats={formats} />
      </Link>
    </div>
  )
}

export default BlogPreview
