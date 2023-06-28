import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { useRouter } from "next/router"

import type {
  APICategories,
  APICategory,
  CategoryAttributes,
} from "types/api-types"
import Layout from "components/layout"

import { initializeApollo } from "lib/apollo-client"
import { GET_CATEGORIES } from "lib/gql/requests"

export interface CategoryProps {
  slug: string
  // categoryData: CategoryAttributes
  name: string
  description: string
}

const CategoryPage: React.FC<CategoryProps> = ({ slug, name, description }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout type="basic">
        {/* TODO: Add a loading spinner/bar for SSR */}
        <div>Loading...</div>
      </Layout>
    )
  }
  // const { name, description } = categoryData

  return (
    <Layout type="blog">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="capitalize">{slug}</h1>
        <div>Category - Under Construction</div>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </Layout>
  )
}

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const {
    data: { categories },
  } = await apolloClient.query({ query: GET_CATEGORIES })

  // Gets the slugs and data for the category pages
  const paths = categories?.data?.attributes?.map(
    ({ slug }: CategoryAttributes) => ({
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

  // TODO: Fetch the posts by category and return to the category page
  // using the params.slug

  if (!params || typeof params.slug === "undefined") return { notFound: true }

  const { slug } = params

  const featuredPosts = []
  const restPosts = []

  return {
    props: {
      slug,
      name: "name placeholder",
      description: "description placeholder",
    },
  }
}
