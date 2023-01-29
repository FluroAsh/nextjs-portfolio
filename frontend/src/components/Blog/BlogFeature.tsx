import React from 'react'
import Link from 'next/link'

import { BlogImage } from 'components/Blog'
import { IBlogFeature } from 'lib/types'

const BlogFeature: React.FC<IBlogFeature> = ({
  attributes: { slug, title, description, cover, createdAt }
}) => {
  console.log(cover.data.attributes.url)
  return (
    <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
      <BlogImage
        url={cover.data.attributes.url}
        alt={cover.data.attributes.alternativeText}
        fill
        linkTo={`blog/${slug}`}
        className="object-cover object-center rounded-lg shadow-lg dark:border dark:border-slate-500"
      />

      <Link
        href={`blog/${slug}`}
        className="transition duration-150 hover:text-orange-500 hover:dark:text-sky-300"
      >
        <h2 className="mt-2 text-3xl">{title}</h2>
      </Link>
      {/* TODO: Add tags */}
      <div className="flex gap-2 mt-1 mb-2 text-orange-600 dark:text-sky-400">
        <div>JAVASCRIPT</div>
        <div>CSS</div>
        <div>NEXT-JS</div>
      </div>

      <h3 className="text-neutral-700 dark:text-slate-300">{createdAt}</h3>
      <p className="mt-2 dark:text-neutral-300 text-neutral-600">
        {description}
      </p>

      <Link href={`blog/${slug}`}>
        <div className="mt-2">Read more &rarr;</div>
      </Link>
    </div>
  )
}

export default BlogFeature
