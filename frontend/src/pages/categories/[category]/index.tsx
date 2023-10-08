import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import {
  APICategory,
  PostData,
  QueryCategories,
  QueryPosts,
  QuerySlugs,
} from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { Pagination } from "components/Pagination"

import { initializeApollo } from "lib/apollo-client"
import {
  GET_CATEGORY,
  GET_CATEGORY_SLUGS,
  GET_POSTS_BY_CATEGORY,
} from "lib/gql/categoryQueries"
import { GET_CATEGORY_PAGE_META, type QueryPageMeta } from "lib/gql/metaQueries"

const CategoryPage: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  category: APICategory["attributes"]
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, category, currentPage, totalPages }) => {
  return (
    <PostLayout
      title={`ashleygthompson | ${category.name} Posts`}
      heroTitle={`Latest for ${category.name}`}
      heroDescription={category.description}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const {
    data: { categories },
  } = await apolloClient.query<QuerySlugs>({
    query: GET_CATEGORY_SLUGS,
  })

  const paths = categories?.data?.map(({ attributes: { slug } }) => ({
    params: {
      category: slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  const { category: categorySlug } = params ?? {}

  if (typeof categorySlug !== "string") return { notFound: true }

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query<QueryPageMeta>({
    query: GET_CATEGORY_PAGE_META,
    variables: { slug: categorySlug },
  })

  const { page: currentPage, pageCount: totalPages } = meta.pagination

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug: categorySlug, currentPage },
  })

  const {
    data: { categories },
  } = await apolloClient.query<QueryCategories>({
    query: GET_CATEGORY,
    variables: { slug: categorySlug },
  })

  const restPosts = posts.data.slice(1) ?? []
  const featuredPost = posts.data[0] ?? null
  const category = categories.data[0].attributes

  return {
    props: {
      posts: restPosts,
      featuredPost,
      category,
      currentPage,
      totalPages,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default CategoryPage
