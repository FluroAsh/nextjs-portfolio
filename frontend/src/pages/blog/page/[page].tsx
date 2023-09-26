import { GetStaticPropsContext } from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import { PostData, QueryPosts } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { Pagination } from "components/Pagination"

import { initializeApollo } from "lib/apollo-client"
import { GET_POSTS_PAGE_META, QueryPageMeta } from "lib/gql/metaQueries"
import { GET_POSTS } from "lib/gql/postQueries"

const Page = ({
  posts,
  featuredPost,
  currentPage,
  totalPages,
}: {
  posts: PostData[]
  featuredPost: PostData
  currentPage: number
  totalPages: number
}) => {
  return (
    <PostLayout title="More posts" heroTitle="Down the rabbit hole we go...">
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        type="blog"
      />
    </PostLayout>
  )
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query<QueryPageMeta>({ query: GET_POSTS_PAGE_META })
  const totalPages = meta?.pagination?.pageCount

  const paths = Array.from({ length: totalPages }, (_, page) => ({
    params: {
      page: `${page + 1}`,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  const { page } = params ?? {}

  if (typeof page !== "string") return { notFound: true }

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query({ query: GET_POSTS_PAGE_META })

  const { total: postCount, pageCount: totalPages } = meta?.pagination

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS,
    variables: { currentPage: parseInt(page) },
  })

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0]

  return {
    props: {
      posts: restPosts,
      featuredPost,
      currentPage: parseInt(page),
      totalPages,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default Page
