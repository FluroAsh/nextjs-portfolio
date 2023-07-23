import { getSlugPath } from "constants/paths"

import type { APICategory, PostAttributes } from "types/api-types"
import Button from "components/Button"
import { Categories } from "components/Category"
import { TimeDate } from "components/TimeDate"

import { BlogTitle } from "./BlogTitle"

const BlogPreview: React.FC<{
  attributes: PostAttributes
  categoryData: APICategory[]
}> = ({ attributes, categoryData }) => {
  const { slug, title, description, createdAt } = attributes

  return (
    <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
      <div className="sm:justify-between sm:flex">
        <Button
          href={getSlugPath("blog", slug)}
          className="transition hover:text-orange-500 hover:dark:text-sky-600 text-neutral-800 dark:text-white"
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
        className="mt-4 mb-2"
        type="link"
      >
        Read more &rarr;
      </Button>
    </div>
  )
}

export default BlogPreview
