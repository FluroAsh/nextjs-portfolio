import type { FormatProps, Formats, IAttributes } from "./api-types"

/** COMPONENT TYPES */
export interface IBlog {
  posts: IPostsData[]
  featuredPost: IBlogFeature
}

export interface IBlogImage {
  sourceUrl?: string
  alt: string
  placeholder?: string
  className?: string
  linkTo?: string
  featured?: boolean
  formats: Formats
}

export interface IBlogFeature {
  id?: string
  attributes: IAttributes
}

export interface IBlogPreview {
  attributes: IAttributes
}

export interface PostProps {
  title: string
  slug: string
  description: string
  content: string
  url: string
  createdAt: string
  alternativeText: string
  formats: Formats
}

/** DATA TYPES */
export interface IPostsData {
  id: string
  attributes: IAttributes
}
