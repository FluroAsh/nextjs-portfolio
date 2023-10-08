import Link from "next/link"
import { getSlugPath } from "constants/paths"

import type { APICategory, PostAttributes } from "types/api-types"
import Button from "components/Button"
import { Categories } from "components/Category"
import { TimeDate } from "components/TimeDate"

import { cn } from "lib/utils"

import BlogImage from "./BlogImage"
import { BlogTitle } from "./BlogTitle"

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
      <div className="sm:justify-between sm:flex">
        <Button
          href={getSlugPath("blog", slug)}
          className="transition-colors duration-300 hover:text-sky-600 text-neutral-800 dark:text-white"
          type="text"
        >
          <BlogTitle title={title} />
        </Button>
        <Categories categoryData={categoryData} />
      </div>

      <TimeDate createdAt={createdAt} type="index" />
      <p className="mt-2 dark:text-neutral-300 text-neutral-600">
        {description}
      </p>

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
