import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { useRouter } from "next/router"

import { PostData } from "types/api-types"
import Layout from "components/layout"

import { initializeApollo } from "lib/apollo-client"
import { GET_CATEGORY_SLUGS, GET_POSTS_BY_CATEGORY } from "lib/gql/requests"
import { getPosts } from "lib/utils"

const CategoryPage: React.FC<{
  // slug: string
  // name: string
  // description: string
  posts: PostData[]
  featuredPost: PostData
}> = ({ posts, featuredPost }) => {
  const router = useRouter()
  const { slug } = router.query
  // console.log({ posts, featuredPost })
  // console.log(featuredPost)

  if (router.isFallback) {
    return (
      <Layout type="basic">
        {/* TODO: Add skeleton loading for SSR */}
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout type="blog">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="capitalize text-xl mt-4">{slug}</h1>
        <div className="mb-4">Under Construction</div>

        {featuredPost && (
          <div>Featured Post: {featuredPost.attributes.title}</div>
        )}

        {posts.map(({ attributes }) => (
          <div>{attributes.title}</div>
        ))}
      </div>
    </Layout>
  )
}

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const {
    data: { categories },
  } = await apolloClient.query({ query: GET_CATEGORY_SLUGS })

  const paths = categories?.data?.attributes?.map(
    ({ slug }: { slug: string }) => ({
      params: {
        slug,
      },
    })
  )

  return {
    paths: paths || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const apolloClient = initializeApollo() // fetch the posts

  if (!params || typeof params.slug === "undefined") return { notFound: true }

  const { slug } = params

  const {
    data: { posts },
  } = await apolloClient.query({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug },
  })

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
