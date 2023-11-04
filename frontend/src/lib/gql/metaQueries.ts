import { gql } from "@apollo/client"

import { QueryPageMeta } from "types/api-types"

import { initializeApollo } from "lib/apollo-client"

const apolloClient = initializeApollo()

export const GET_POSTS_PAGE_META = gql`
  query getPostsMeta {
    posts {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`

export const fetchPostsPageMeta = () =>
  apolloClient
    .query<QueryPageMeta>({ query: GET_POSTS_PAGE_META })
    .then(({ data }) => data.posts.meta.pagination)
    .catch((e) => {
      console.error(e)
      throw new Error("Error fetching posts meta!")
    })

export const GET_CATEGORY_PAGE_META = gql`
  query getCategoryMeta($slug: String!) {
    posts(filters: { categories: { slug: { eq: $slug } } }) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`

export const fetchCategoryPageMeta = (slug: string) =>
  apolloClient
    .query<QueryPageMeta>({
      query: GET_CATEGORY_PAGE_META,
      variables: { slug },
    })
    .then(({ data }) => data?.posts?.meta?.pagination)
    .catch((e) => {
      console.error(e)
      throw new Error(`Error fetching category page meta — Category: ${slug}`)
    })
