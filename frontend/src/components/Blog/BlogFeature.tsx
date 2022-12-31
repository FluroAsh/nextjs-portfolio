import React from 'react'
import Link from 'next/link'

import { BlogImage } from 'components/Blog'
import { IBlogFeature } from 'lib/types'

const BlogFeature: React.FC<IBlogFeature> = ({
  attributes: { slug, title, description, cover, createdAt }
}) => {
  return (
    <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
      <BlogImage
        url={process.env.NEXT_PUBLIC_STRAPI_API_URL + cover.data.attributes.url}
        alt={cover.data.attributes.alternativeText}
        fill
        linkTo={`blog/${slug}`}
        className="object-cover object-center rounded-lg shadow-lg dark:border dark:border-slate-500"
      />

      <Link href={`blog/${slug}`}>
        <h2 className="my-2 text-3xl">{title}</h2>
      </Link>
      <h3>{createdAt}</h3>
      <p className="mt-2">{description}</p>

      <Link href={`blog/${slug}`}>
        <p className="mt-2">Read more &rarr;</p>
      </Link>
    </div>
  )
}

export default BlogFeature
