import React from 'react'
import Link from 'next/link'

import Button from 'components/Button'
import { IBlogPreview } from 'lib/types'
import dayjs from 'dayjs'

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

      <h3 className="dark:text-slate-300 text-neutral-700">
        {dayjs(createdAt).format('MMM, YYYY — dddd [@] h:mm A')}
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
