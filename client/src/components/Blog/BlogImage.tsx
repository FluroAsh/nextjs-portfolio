/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import type { BlogImageProps } from "types/blog-types"

import { checkImgFormats, cn } from "lib/utils"

const BlogImage: React.FC<BlogImageProps> = ({
  alt = "placeholder",
  className: extraStyles,
  linkTo,
  featured,
  formats,
}) => {
  checkImgFormats(formats)

  // TODO: Add a blur JS placeholder using thumbnail (5ish kb)
  const { large, medium, small /*, thumbnail*/ } = formats ?? {}

  const imageComponent = (
    <div className="relative max-w-full h-60 sm:h-[20rem] md:h-96 overflow-hidden rounded-lg shadow-lg group">
      <picture className={extraStyles}>
        <source media={`(max-width: ${small.width}px)`} srcSet={small.url} />
        <source media={`(max-width: ${medium.width}px)`} srcSet={medium.url} />
        <img
          src={large.url}
          alt={alt}
          width={large.width}
          className="object-cover object-bottom w-full h-full"
        />
      </picture>
      {featured && (
        <div
          className={cn(
            "absolute top-0 left-0 px-4 py-1 text-sm font-semibold uppercase text-neutral-100 tracking-wide transition duration-300",
            "rounded-br-lg pointer-events-none bg-sky-600 group-hover:bg-sky-500/90 border-sky-800"
          )}
        >
          featured
        </div>
      )}
    </div>
  )

  return linkTo ? <Link href={linkTo}>{imageComponent}</Link> : imageComponent
}

export default BlogImage
