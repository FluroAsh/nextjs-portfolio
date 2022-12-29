import { IBlogImage } from 'lib/types'
import Image from 'next/image'
import React from 'react'

const BlogImage: React.FC<IBlogImage> = ({
  url,
  fill = true,
  alt = 'placeholder',
  className = ''
}) => {
  return (
    <div className="relative max-w-full mt-5 h-96">
      <Image src={url} fill={fill} alt={alt} className={className} />
    </div>
  )
}

export default BlogImage
