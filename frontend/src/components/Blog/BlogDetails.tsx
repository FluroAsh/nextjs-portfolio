import { getSlugPath } from "constants/paths"

import type { APICategory } from "types/api-types"
import BlogTitle from "components/Blog/BlogTitle"
import Button from "components/Button"
import { Categories } from "components/Category"
import { TimeDate } from "components/TimeDate"

const BlogDetails: React.FC<{
  slug: string
  title: string
  createdAt: string
  categoryData: APICategory[]
  description: string
}> = ({ slug, title, createdAt, categoryData, description }) => {
  return (
    <div className="max-w-full">
      <div className="sm:justify-between sm:flex">
        <div>
          <Button
            href={getSlugPath("blog", slug)}
            className="transition-colors duration-300 hover:text-sky-600 text-neutral-700 dark:text-white max-w-full"
            type="text"
          >
            <BlogTitle
              title={title}
              className="sm:max-w-[400px] md:max-w-[calc(650px-55px)] lg:max-w-screen-[calc(1024px-200px)]"
            />
          </Button>
          <TimeDate createdAt={createdAt} type="index" />
        </div>

        <Categories categoryData={categoryData} />
      </div>

      <p className="mt-2 dark:text-neutral-300 text-neutral-600 sm:mt-2">
        {description}
      </p>
    </div>
  )
}

export default BlogDetails
