export interface IPost extends IPostData {
  className: string | undefined
}
export interface IPostData {
  title: string
  slug: string
  description: string
  content: string
}
