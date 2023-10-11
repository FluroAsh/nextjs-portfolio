import { getSlugPath } from "constants/paths"

import type { APICategory, PostAttributes } from "types/api-types"
import { BlogDetails, BlogImage } from "components/Blog"
import Button from "components/Button"

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
  )
}

export default BlogFeature
