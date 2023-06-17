import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

import type { IBlogImage } from "types/blog-types"

const BlogImage: React.FC<IBlogImage> = ({
  url,
  fill = true,
  alt = "placeholder",
  className: extraStyles,
  linkTo,
  featured,
}) => {
  const imageComponent = (
    <div className="relative max-w-full h-60 sm:h-[20rem] md:h-96 overflow-hidden rounded-lg shadow-lg group">
      <Image src={url} fill={fill} alt={alt} className={clsx(extraStyles)} />
      {featured && (
        <div className="absolute top-0 left-0 px-4 py-1 text-sm font-semibold text-orange-200 uppercase transition bg-orange-600 border-b border-r rounded-br-lg pointer-events-none dark:bg-sky-600 group-hover:opacity-80 dark:border-slate-500/50 border-orange-300/50">
          featured
        </div>
      )}
    </div>
  )

  return linkTo ? <Link href={linkTo}>{imageComponent}</Link> : imageComponent
}

export default BlogImage
