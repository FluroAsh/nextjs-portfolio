import { BlogFeatureProps } from "types/blog-types"
import { BlogImage } from "components/Blog"
import Button from "components/Button"
import { Categories } from "components/Category"
import { TimeDate } from "components/TimeDate"

import { BlogTitle } from "./BlogTitle"

const BlogFeature: React.FC<BlogFeatureProps> = ({
  attributes,
  categoryData,
}) => {
  const { slug, title, description, cover, createdAt } = attributes

  return (
    <div
      id="featured-post"
      className="pb-4 border-b dark:border-slate-500 border-orange-300/50"
    >
      <div className="relative my-4">
        <BlogImage
          alt={cover.data.attributes.alternativeText}
          featured
          linkTo={`blog/${slug}`}
          formats={cover.data.attributes.formats}
          className="transition duration-300 hover:brightness-75"
        />
      </div>

      <div className="sm:flex sm:justify-between">
        <Button
          href={`blog/${slug}`}
          className="transition hover:text-orange-500 hover:dark:text-sky-600 text-neutral-800 dark:text-white"
          type="text"
        >
          <BlogTitle title={title} />
        </Button>
        <TimeDate createdAt={createdAt} />
      </div>

      <Categories categoryData={categoryData} />
      <p className="mt-2 dark:text-neutral-300 text-neutral-600">
        {description}
      </p>

      <Button href={`blog/${slug}`} className="mt-4 mb-2" type="link">
        Read more &rarr;
      </Button>
    </div>
  )
}

export default BlogFeature
