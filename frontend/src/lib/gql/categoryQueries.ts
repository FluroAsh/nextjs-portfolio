import { gql } from "@apollo/client"

import type { QueryCategories, QueryPosts, QuerySlugs } from "types/api-types"

import { initializeApollo } from "lib/apollo-client"

const apolloClient = initializeApollo()

export const GET_POSTS_BY_CATEGORY = gql`
  query getPostsByCategory($slug: String!, $currentPage: Int!) {
    posts(
      filters: { categories: { slug: { eq: $slug } } }
      pagination: { page: $currentPage, pageSize: 10 }
    ) {
      data {
        id
        attributes {
          slug
          title
          description
          content
          categories {
            data {
              attributes {
                name
                slug
                description
              }
            }
          }
          cover {
            data {
              attributes {
                url
                alternativeText
                formats
              }
            }
          }
          createdAt
        }
      }
    }
  }
`

export const fetchCategoryPosts = (slug: string, page: string | number) => {
  const currentPage = typeof page === "string" ? parseInt(page) : page
  return apolloClient
    .query<QueryPosts>({
      query: GET_POSTS_BY_CATEGORY,
      variables: { slug, currentPage },
    })
    .then(({ data }) => data.posts)
    .catch((e) => {
      console.error(e)
      throw new Error(
        `Error fetching category posts — Category: ${slug} & Page: ${page} `
      )
    })
}

export const GET_CATEGORY = gql`
  query getCategoryBySlug($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
          name
          description
        }
      }
    }
  }
`

export const fetchCategory = (slug: string) =>
  apolloClient
    .query<QueryCategories>({
      query: GET_CATEGORY,
      variables: { slug },
    })
    .then(({ data }) => data.categories)
    .catch((e) => {
      console.error(e)
      throw new Error(`Error fetching categories — Category: ${slug}`)
    })

export const GET_CATEGORY_SLUGS = gql`
  query getCategories {
    categories {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`

export const fetchCategorySlugs = () =>
  apolloClient
    .query<QuerySlugs>({
      query: GET_CATEGORY_SLUGS,
    })
    .then(({ data }) => data.categories)
    .catch((e) => {
      console.error(e)
      throw new Error("Error fetching category slugs!")
    })
