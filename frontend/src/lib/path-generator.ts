import type { QueryPageMeta, QuerySlugs } from "types/api-types"

import { initializeApollo } from "./apollo-client"
import { GET_CATEGORY_SLUGS } from "./gql/categoryQueries"
import { GET_CATEGORY_PAGE_META, GET_POSTS_PAGE_META } from "./gql/metaQueries"
import { GET_POST_SLUGS } from "./gql/postQueries"

const apolloClient = initializeApollo()

// TODO: Clean up these types or restructure the response so they can be simplified
export type GeneratorCategorySlugs = Awaited<
  ReturnType<typeof generatePaths.CATEGORY.slugs>
>
export type GeneratorCategoryPages = Awaited<
  ReturnType<typeof generatePaths.CATEGORY.pages>
>
export type GeneratorBlogSlugs = Awaited<
  ReturnType<typeof generatePaths.BLOG.slugs>
>
export type GeneratorBlogPages = Awaited<
  ReturnType<typeof generatePaths.BLOG.pages>
>

export const generatePaths = Object.freeze({
  CATEGORY: {
    slugs: async () => {
      const {
        data: { categories },
      } = await apolloClient.query<QuerySlugs>({
        query: GET_CATEGORY_SLUGS,
      })

      return categories?.data?.map(({ attributes: { slug } }) => ({
        params: {
          category: slug,
        },
      }))
    },
    pages: async () => {
      const {
        data: { categories },
      } = await apolloClient.query<QuerySlugs>({
        query: GET_CATEGORY_SLUGS,
      })

      // NOTE: Must be awaited with Promise.all due to MULTIPLE GraphQL queries for each category
      const paths = await Promise.all(
        categories.data?.map(async ({ attributes: { slug } }) => {
          const {
            data: {
              posts: { meta },
            },
          } = await apolloClient.query<QueryPageMeta>({
            query: GET_CATEGORY_PAGE_META,
            variables: { slug },
          })

          const { pageCount } = meta.pagination

          return Array.from({ length: pageCount }, (_, page) => ({
            params: {
              category: slug,
              page: `${page + 1}`,
            },
          }))
        })
      )
      return paths.flat()
    },
  },
  BLOG: {
    slugs: async () => {
      const {
        data: { posts },
      } = await apolloClient.query<QuerySlugs>({ query: GET_POST_SLUGS })

      return posts?.data?.map(({ attributes: { slug } }) => ({
        params: { slug },
      }))
    },
    pages: async () => {
      const {
        data: {
          posts: { meta },
        },
      } = await apolloClient.query<QueryPageMeta>({
        query: GET_POSTS_PAGE_META,
      })
      const totalPages = meta?.pagination?.pageCount

      return Array.from({ length: totalPages }, (_, page) => ({
        params: {
          page: `${page + 1}`,
        },
      }))
    },
  },
})
