import Link from "next/link"
import dayjs from "dayjs"

import type { BlogPreviewProps } from "types/blog-types"
import Button from "components/Button"
import { Categories } from "components/Category"

const BlogPreview: React.FC<BlogPreviewProps> = ({
  attributes,
  categoryData,
}) => {
  const { slug, title, description, createdAt } = attributes

  return (
    <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
      <Link
        href={`/blog/${slug}`}
        className="transition hover:text-orange-500 hover:dark:text-sky-600 text-neutral-800 dark:text-white"
      >
        <h2 className="text-3xl font-bold">{title}</h2>
      </Link>

      <Categories categoryData={categoryData} />

      <h3 className="dark:text-slate-300 text-neutral-700">
        {dayjs(createdAt).format("dddd, DD MMMM")}
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

export default BlogPreview
