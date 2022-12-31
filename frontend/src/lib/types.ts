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

interface IAttributes {
  slug: string
  title: string
  description: string
  cover: {
    data: {
      attributes: {
        url: string
        alternativeText: string
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
