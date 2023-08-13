import type { GetStaticProps } from "next"
import Link from "next/link"
import { ROUTE_URL } from "constants/paths"
import { PostLayout } from "Layouts/PostLayout"

import type { PostData, QueryPosts } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"

import { initializeApollo } from "lib/apollo-client"
import { GET_PAGE_META } from "lib/gql/metaQueries"
import { GET_POSTS } from "lib/gql/postQueries"

// TODO: Get currentPage/totalPages from API
const Blog: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, currentPage, totalPages }) => {
  /** TODO:
   * 1. Create separate component for 'remaining posts'
   * 2. Add pagination and limit page to 5 posts per page (1st page is latest)
   * - When user navigates to next page the title & description should change to 'All Posts'
   * 3. Update Styles for hover & ring effect etc.
   */

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
      <div id="pagination" className="flex justify-center w-full mt-3">
        {currentPage < totalPages && (
          <Link
            href={`${ROUTE_URL.BLOG}/${ROUTE_URL.PAGE}/${currentPage + 1}`}
            className="px-5 py-2 duration-200 border rounded-sm bg-slate-500 border-slate-400 hover:bg-slate-400/80 transition-color"
          >
            Next
          </Link>
        )}
      </div>
    </PostLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query({ query: GET_PAGE_META })

  const { page: currentPage, pageCount: totalPages } = meta?.pagination

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS,
    variables: {
      currentPage: 1,
    },
  })

  const featuredPost = posts.data[0]
  const restPosts = posts.data.slice(1)

  return {
    props: {
      posts: restPosts,
      featuredPost,
      currentPage,
      totalPages,
    },
  }
}
export default Blog
