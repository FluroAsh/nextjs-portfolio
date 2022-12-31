import Image from 'next/image'
import React from 'react'

import { IBlogImage } from 'lib/types'
import Link from 'next/link'

const BlogImage: React.FC<IBlogImage> = ({
  url,
  fill = true,
  alt = 'placeholder',
  className = '',
  linkTo
}) => {
  const imageComponent = (
    <div className="relative max-w-full h-60 sm:h-[20rem] md:h-96">
      <Image src={url} fill={fill} alt={alt} className={className} />
    </div>
  )

  return (
    <>
      {linkTo ? (
        <Link href={linkTo}>{imageComponent}</Link>
      ) : (
        <>{imageComponent}</>
      )}
    </>
  )
}

export default BlogImage
