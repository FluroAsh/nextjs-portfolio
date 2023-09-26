import type { GetStaticProps } from "next"
import { PostLayout } from "Layouts/PostLayout"

import type { PostData, QueryPosts } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { Pagination } from "components/Pagination"

import { initializeApollo } from "lib/apollo-client"
import { GET_POSTS_PAGE_META, QueryPageMeta } from "lib/gql/metaQueries"
import { GET_POSTS } from "lib/gql/postQueries"

const Blog: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, currentPage, totalPages }) => (
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
        type="text"
      />
    ))}
    <Pagination currentPage={currentPage} totalPages={totalPages} type="blog" />
  </PostLayout>
)

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query<QueryPageMeta>({ query: GET_POSTS_PAGE_META })

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
