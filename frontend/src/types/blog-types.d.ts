import type { IAttributes } from "./api-types"

/** COMPONENT TYPES */
export interface IBlog {
  posts: IPostsData[]
  featuredPost: IBlogFeature
}

export interface IBlogImage {
  url: string
  fill?: boolean
  alt?: string
  placeholder?: string
  className?: string
  linkTo?: string
  featured?: boolean
}

export interface IBlogFeature {
  id?: string
  attributes: IAttributes
}

export interface IBlogPreview {
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

/** DATA TYPES */
export interface IPostsData {
  id: string
  attributes: IAttributes
}
