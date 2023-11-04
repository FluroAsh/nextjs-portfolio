import { gql } from "@apollo/client"

import type { QueryPosts } from "types/api-types"

import { initializeApollo } from "lib/apollo-client"

const apolloClient = initializeApollo()

// TODO: Add other queries and abstract into functions...

export const GET_POSTS = gql`
  query getPosts($currentPage: Int!) {
    posts(pagination: { page: $currentPage, pageSize: 10 }) {
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

export const getHomePagePosts = () =>
  apolloClient
    .query<QueryPosts>({
      query: GET_HOMEPAGE_POSTS,
      variables: { limit: 3 },
    })
    .then(({ data }) => data.posts)
    .catch((e) => {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })
