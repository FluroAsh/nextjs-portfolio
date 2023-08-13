import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { useRouter } from "next/router"
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

import { initializeApollo } from "lib/apollo-client"
import {
  GET_CATEGORY,
  GET_CATEGORY_SLUGS,
  GET_POSTS_BY_CATEGORY,
} from "lib/gql/categoryQueries"

const CategoryPage: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  category: APICategory["attributes"]
}> = ({ posts, featuredPost, category }) => {
  return (
    <PostLayout
      title={`${category.name} Posts`}
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
        />
      ))}
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
      slug,
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
  const { slug } = params ?? {}

  if (typeof slug !== "string") return { notFound: true }

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug },
  })

  const {
    data: { categories },
  } = await apolloClient.query<QueryCategories>({
    query: GET_CATEGORY,
    variables: { slug },
  })

  // TODO: Add pagination so we're not just returning the first featuredPost
  const restPosts = posts.data.slice(1) ?? []
  const featuredPost = posts.data[0] ?? null
  const category = categories.data[0].attributes

  return {
    props: {
      posts: restPosts,
      featuredPost,
      category,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default CategoryPage
