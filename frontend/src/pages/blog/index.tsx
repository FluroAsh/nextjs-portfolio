import { useState } from "react"
import type { GetStaticProps } from "next"
import { PostLayout } from "Layouts/PostLayout"

import type { PostData, QueryPosts } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"

import { initializeApollo } from "lib/apollo-client"
import { GET_POSTS } from "lib/gql/postQueries"
import { getPosts } from "lib/utils"

const Blog: React.FC<{ posts: PostData[]; featuredPost: PostData }> = ({
  posts,
  featuredPost,
}) => {
  /** TODO:
   * 1. Create separate component for 'remaining posts'
   * 2. Add pagination and limit page to 5 posts per page (1st page is latest)
   * - When user navigates to next page the title & description should change to 'All Posts'
   * 3. Update Styles for hover & ring effect etc.
   */

  // TODO: Finish pagination implementation
  const [currentPage, setCurrentPage] = useState<number>(1)
  const PAGE_SIZE = 5

  return (
    <PostLayout title="Latest Posts">
      {featuredPost && (
        <BlogFeature
          attributes={featuredPost.attributes}
          categoryData={featuredPost.attributes.categories.data}
        />
      )}

      {posts.map((post) => (
        <BlogPreview
          key={post.id}
          attributes={post.attributes}
          categoryData={post.attributes.categories.data}
        />
      ))}
    </PostLayout>
  )
}

// TODO: Page paths
// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//   }
// }

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({ query: GET_POSTS })

  // TODO: Add pagination so we're not just returning the first featuredPost
  const featuredPost = getPosts(posts?.data, { isFeatured: true })[0]
  const restPosts = getPosts(posts?.data)

  return {
    props: {
      posts: restPosts,
      featuredPost: featuredPost ? { ...featuredPost } : null,
    },
  }
}

export default Blog
