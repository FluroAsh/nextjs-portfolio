export type QuerySlugs = {
  [key: string]: {
    data: {
      attributes: {
        slug: string
      }[]
    }
  }
}

export type QueryPosts = { posts: { data: PostData[] } }
export type QueryPost = { posts: { data: PostData } }
export interface PostData {
  id: string
  attributes: PostAttributes
  categories: {
    data: APICategory[]
  }
}

export interface PostAttributes {
  slug: string
  title: string
  description: string
  categories: {
    data: APICategory[]
  }
  cover: {
    data: APICover
  }
  content: string
  createdAt: string
  isFeatured: boolean
}

export type QueryCategories = { categories: { data: APICategory[] } }
export interface APICategory {
  id: string
  attributes: {
    slug: string
    name: string
    description: string
  }
}

export interface APICover {
  attributes: {
    url: string
    alternativeText: string
    formats: Formats
  }
}

type ImageExtensions = "jpg" | "png" | "webp" | "gif" | "avif"
type ImageMimes =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/avif"

export enum formatName {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  THUMBNAIL = "thumbnail",
}

// Mapped type, as we can't achieve this with an interface
export type Formats = {
  [property in formatName]: FormatProps
}

export type FormatProps = {
  name: string
  hash: string
  ext: ImageExtensions
  mime: ImageMimes
  width: number
  height: number
  size: number
  url: string
}
