import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query getPosts {
    posts {
      data {
        id
        attributes {
          slug
          title
          description
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
          isFeatured
        }
      }
    }
  }
`

export const GET_POST_SLUGS = gql`
  {
    posts {
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
