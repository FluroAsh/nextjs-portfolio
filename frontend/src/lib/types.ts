export interface IBlog {
  posts: IPostsData[]
  featuredPost: IPostsData
}

export interface IPost extends IPostData {
  className: string | undefined
}

export interface IPostData {
  title: string
  slug: string
  description: string
  content: string
  imageUrl: string
  createdAt: string
  altText: string
}

export interface IPostsData extends Attributes {
  id: string
}

interface Attributes {
  attributes: {
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
    isFeatured: boolean
  }
}

export interface IBlogImage {
  url: string
  fill?: boolean
  alt?: string
  className?: string
}
