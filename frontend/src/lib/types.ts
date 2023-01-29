export interface IBlog {
  posts: IPostsData[]
  featuredPost: IBlogFeature
}
export interface IBlogFeature {
  id?: string
  attributes: IAttributes
}

export interface IPost {
  title: string
  slug: string
  description: string
  content: string
  url: string
  createdAt: string
  alternativeText: string
}

export interface IPostsData {
  id: string
  attributes: IAttributes
}

export interface IAttributes {
  slug: string
  title: string
  description: string
  cover: {
    data: {
      attributes: {
        url: string
        alternativeText: string
        formats: Formats
      }
    }
  }
  createdAt: string
  isFeatured?: boolean
}

export interface IBlogImage {
  url: string
  fill?: boolean
  alt?: string
  className?: string
  linkTo?: string
}

type ImageExtensions = 'jpg' | 'png' | 'webp' | 'gif' | 'avif'
type ImageMimes =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/gif'
  | 'image/avif'

type formatName = 'thumbnail' | 'small' | 'medium' | 'large'

// Mapped type, as we can't achieve this with an interface
export type Formats = {
  [property in formatName]: {
    name: string
    hash: string
    ext: ImageExtensions
    mime: ImageMimes
    width: number
    height: number
    size: number
    url: string
  }
}
