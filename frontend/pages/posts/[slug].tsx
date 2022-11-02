import React from 'react'
// define type for allPosts, post, params

export const Post = () => {
  return (
    <>
      <div>Posts</div>
      <p>Placeholder</p>
    </>
  )
}

// export async function getStaticProps({ params, preview = null }) {
//   // const data = await getPosts(params.slug, preview)
//   // const content = await markdownToHtml(data?.posts[0[]?.content || ''])

//   return {
//     props: {}
//   }
// }

// export async function getStaticPaths() {
//   // const allPosts = await getAllPostsWithSlug()
//   return {
//     paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
//     fallback: true
//   }
// }

export default Post
