import { getSlugPath } from "constants/paths"

import type { APICategory, PostAttributes } from "types/api-types"
import { BlogImage } from "components/Blog"
import Button from "components/Button"
import { Categories } from "components/Category"
import { TimeDate } from "components/TimeDate"

import { BlogTitle } from "./BlogTitle"

const BlogFeature: React.FC<{
  attributes: PostAttributes
  categoryData: APICategory[]
}> = ({ attributes, categoryData }) => {
  const { slug, title, description, cover, createdAt } = attributes

  return (
    <div id="featured-post" className="pb-4 border-b border-slate-500">
      <div className="relative my-4">
        <BlogImage
          alt={cover.data.attributes.alternativeText}
          featured
          linkTo={getSlugPath("blog", slug)}
          formats={cover.data.attributes.formats}
          className="transition duration-300 hover:brightness-110"
        />
      </div>

      <div className="sm:flex sm:justify-between">
        <Button
          href={getSlugPath("blog", slug)}
          className="transition hover:text-sky-600 text-neutral-800 dark:text-white"
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
  )
}

export default BlogFeature
