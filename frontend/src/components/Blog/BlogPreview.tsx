import React from 'react'
import Link from 'next/link'

import { IBlogPreview } from 'lib/types'

const BlogPreview: React.FC<IBlogPreview> = ({ attributes }) => {
  const { slug, title, description, createdAt } = attributes
  return (
    <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
      <Link
        href={`/blog/${slug}`}
        className="transition duration-150 hover:text-orange-500 hover:dark:text-sky-600"
      >
        <h2 className="text-3xl">{title}</h2>
      </Link>
      {/* TODO: Add tags */}
      <div className="flex gap-2 mt-1 mb-2 text-orange-600 dark:text-sky-400">
        <div>JAVASCRIPT</div>
        <div>CSS</div>
        <div>NEXT-JS</div>
      </div>

      <h3 className="dark:text-slate-300 text-neutral-700">{createdAt}</h3>
      <p className="mt-2 dark:text-neutral-300 text-neutral-600">
        {description}
      </p>

      {/* TODO: Turn into a button with an outline by default, then filled when hovered/active */}
      <Link href={`blog/${slug}`}>
        <div className="mt-2">Read more &rarr;</div>
      </Link>
    </div>
  )
}

export default BlogPreview
