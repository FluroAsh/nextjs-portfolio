export interface IPost {
  title: string
  slug: string
  description: string
  content: string
}

export interface IPostData {
  post: IPost
}

export interface IPostsData {
  posts: IPost[]
}
