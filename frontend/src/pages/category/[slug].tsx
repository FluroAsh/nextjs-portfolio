import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { useRouter } from "next/router"
import { DAILY_REVALIDATION } from "constants/api"
import Layout from "Layouts/layout"
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
import { getPosts } from "lib/utils"

const CategoryPage: React.FC<{
  posts: PostData[]
  featuredPost: PostData
  category: APICategory["attributes"]
}> = ({ posts, featuredPost, category }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout type="basic">
        {/* TODO: Add skeleton loading for SSR */}
        <div>Loading...</div>
      </Layout>
    )
  }

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

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const {
    data: { categories },
  } = await apolloClient.query<QuerySlugs>({
    query: GET_CATEGORY_SLUGS,
  })

  const paths = categories?.data?.attributes?.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths: paths || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params || typeof params.slug === "undefined") return { notFound: true }

  const apolloClient = initializeApollo()

  const { slug } = params

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

  const restPosts = getPosts(posts?.data)
  // TODO: Add pagination so we're not just returning the first featuredPost
  const featuredPost = getPosts(posts?.data, { isFeatured: true })[0]
  const category = categories.data[0].attributes

  return {
    props: {
      posts: restPosts,
      featuredPost: featuredPost ? { ...featuredPost } : null,
      category,
    },
    revalidate: DAILY_REVALIDATION,
  }
}
