import { formatName, type Formats, type PostData } from "types/api-types"

export const truncateTitle = (title: string) => {
  const CHAR_LIMIT = 20
  return title.length >= CHAR_LIMIT
    ? `${title.substring(0, CHAR_LIMIT)}...`
    : title
}

export const readingMinutes = (minutes: number) => {
  const roundedMinutes = Math.round(minutes)
  return minutes > 1
    ? `${roundedMinutes} minutes reading`
    : `${roundedMinutes} minute read`
}

export const checkImgFormats = (formats: Formats) => {
  const validFormat =
    Object.keys(formats).filter((key: any) =>
      [
        formatName.LARGE,
        formatName.MEDIUM,
        formatName.SMALL,
        formatName.THUMBNAIL,
      ].includes(key)
    ).length > 0

  if (!validFormat)
    throw Error(
      "\n\n🚨 Invalid format for Blog Image. Check the uploaded image.\n\n"
    )
}

export const getFeaturedPost = (posts: PostData[]) =>
  posts.filter((post: PostData) => post.attributes.isFeatured)

export const getPosts = (
  posts: PostData[],
  { isFeatured }: { isFeatured?: boolean } = {}
) =>
  isFeatured
    ? getFeaturedPost(posts)
    : posts.filter((post) => !post.attributes.isFeatured)
