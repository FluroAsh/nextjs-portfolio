import Image from 'next/image'
import React from 'react'

import { IBlogImage } from 'lib/types'
import Link from 'next/link'
import clsx from 'clsx'

const BlogImage: React.FC<IBlogImage> = ({
  url,
  fill = true,
  alt = 'placeholder',
  className = '',
  linkTo
}) => {
  const imageComponent = (
    <div className="relative max-w-full h-60 sm:h-[20rem] md:h-96">
      <Image
        src={url}
        fill={fill}
        alt={alt}
        className={clsx(className, 'rounded-lg shadow-lg')}
      />
    </div>
  )

  return linkTo ? <Link href={linkTo}>{imageComponent}</Link> : imageComponent
}

export default BlogImage
