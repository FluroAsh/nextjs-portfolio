import { gql } from "@apollo/client"

/**
 * Query to retrieve metadata about the `Posts` collection
 *
 * @page current page
 * @pagesize number of posts per page
 * @pageCount total number of pages
 * @total total number of posts
 */
export const GET_PAGE_META = gql`
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
