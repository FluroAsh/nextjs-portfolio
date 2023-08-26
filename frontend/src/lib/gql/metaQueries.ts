import { gql } from "@apollo/client"

export type QueryPageMeta = {
  posts: {
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }
}

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
