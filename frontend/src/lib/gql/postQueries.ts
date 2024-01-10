import { gql } from "@apollo/client"

import type { QueryPosts, QuerySlugs } from "types/api-types"

import { initializeApollo } from "lib/apollo-client"

const apolloClient = initializeApollo()

export const GET_POSTS = gql`
  query getPosts($currentPage: Int!) {
    posts(
      sort: "createdAt:desc"
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

export const fetchPosts = (page: string | number) => {
  const currentPage = typeof page === "string" ? parseInt(page) : page
  return apolloClient
    .query<QueryPosts>({
      query: GET_POSTS,
      variables: { currentPage },
    })
    .then(({ data }) => data.posts)
    .catch((e) => {
      console.error(e)
      throw new Error(`Error fetching posts — Page: ${page}`)
    })
}

export const GET_HOMEPAGE_POSTS = gql`
  query getPosts($limit: Int!) {
    posts(sort: "createdAt:desc", pagination: { start: 0, limit: $limit }) {
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

export const fetchHomePosts = () =>
  apolloClient
    .query<QueryPosts>({
      query: GET_HOMEPAGE_POSTS,
      variables: { limit: 3 },
    })
    .then(({ data }) => data.posts)
    .catch((e) => {
      console.error(e)
      throw new Error("Error fetching Home Page posts!")
    })

export const GET_POST_SLUGS = gql`
  query getPostSlugs {
    posts(pagination: { start: 0, limit: 250 }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`

export const fetchPostSlugs = () =>
  apolloClient
    .query<QuerySlugs>({ query: GET_POST_SLUGS })
    .then(({ data }) => data.posts)
    .catch((e) => {
      console.error(e)
      throw new Error("Error fetching post slugs!")
    })

export const GET_POST = gql`
  query getPostsBySlug($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
          title
          description
          content
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

export const fetchPost = (slug: string | string[] | undefined) =>
  apolloClient
    .query<QueryPosts>({
      query: GET_POST,
      variables: { slug },
    })
    .then(({ data }) => data.posts.data[0].attributes)
    .catch((e) => console.error(e)) // NOTE: Not throwing an error here so we can return notFound object in the route
