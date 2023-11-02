import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import type {
  APICategory,
  PostData,
  QueryPageMeta,
  QueryPosts,
} from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { Pagination } from "components/Pagination"

import { initializeApollo } from "lib/apollo-client"
import { GET_POSTS_BY_CATEGORY } from "lib/gql/categoryQueries"
import { GET_CATEGORY_PAGE_META } from "lib/gql/metaQueries"
import { generatePaths } from "lib/path-generator"

const Page: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  category: APICategory["attributes"]
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, category, currentPage, totalPages }) => {
  return (
    <PostLayout
      title={`ashleygthompson | ${category.name}`}
      heroTitle={`Latest for ${category.name}`}
      heroDescription={category.description}
      metaDescription={category.metaDescription}
    >
      {featuredPost && (
        <BlogFeature
          key={featuredPost.id}
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
        type="category"
        slug={category.slug}
      />
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await generatePaths.CATEGORY.pages(),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  const { category: categorySlug, page: currentPage } = params ?? {}

  if (typeof currentPage !== "string" || typeof categorySlug !== "string") {
    return { notFound: true }
  }

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug: categorySlug, currentPage: parseInt(currentPage) },
  })

  // Posts have an associated Category that will match the categorySlug;
  // iterates through the nested Categories properties for the 1st post & retrieves the associated data
  const category = posts.data[0].attributes.categories.data.find(
    ({ attributes }) => attributes.slug === categorySlug
  )?.attributes

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0]

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query<QueryPageMeta>({
    query: GET_CATEGORY_PAGE_META,
    variables: { slug: categorySlug },
  })

  const { pageCount: totalPages } = meta.pagination

  return {
    props: {
      category,
      posts: restPosts,
      featuredPost,
      currentPage: parseInt(currentPage),
      totalPages,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default Page
