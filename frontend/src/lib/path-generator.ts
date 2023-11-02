import { QuerySlugs } from "types/api-types"

import { initializeApollo } from "./apollo-client"
import { GET_CATEGORY_SLUGS } from "./gql/categoryQueries"
import { GET_CATEGORY_PAGE_META, QueryPageMeta } from "./gql/metaQueries"

const apolloClient = initializeApollo()

export const pathGenerator = {
  CATEGORY: {
    slug: () => {
      //
    },
    pages: async () => {
      const {
        data: { categories },
      } = await apolloClient.query<QuerySlugs>({
        query: GET_CATEGORY_SLUGS,
      })

      // NOTE: Must be awaited with Promise.all due to multiple GQL queries
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
    slug: () => {
      //
    },
    pages: () => {
      //
    },
  },
}
