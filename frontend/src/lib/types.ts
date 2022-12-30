export interface IPost extends IPostData {
  className: string | undefined
}
export interface IPostData {
  title: string
  slug: string
  description: string
  content?: string
  imageUrl: string
  published: string
  altText: string
}

export interface IBlogImage {
  url: string
  fill?: boolean
  alt?: string
  className?: string
}
