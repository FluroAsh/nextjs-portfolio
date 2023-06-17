import dayjs from "dayjs"

import { IBlogFeature } from "types/blog-types"
import { BlogImage } from "components/Blog"
import Button from "components/Button"

const BlogFeature: React.FC<IBlogFeature> = ({ attributes }) => {
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

      <Button
        href={`blog/${slug}`}
        className="transition hover:text-orange-500 hover:dark:text-sky-600"
        type="text"
      >
        <h2 className="mt-4 text-3xl">{title}</h2>
      </Button>

      {/* TODO: Add tags */}
      <div className="flex gap-2 mt-1 mb-2 text-orange-600 dark:text-sky-400">
        <div>JAVASCRIPT</div>
        <div>CSS</div>
        <div>NEXT-JS</div>
      </div>

      <h3 className="text-neutral-700 dark:text-slate-300">
        {dayjs(createdAt).format("MMM, YYYY — dddd [@] h:mm A")}
      </h3>
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
