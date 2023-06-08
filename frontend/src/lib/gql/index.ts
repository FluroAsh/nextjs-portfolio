import { gql } from "@apollo/client"

// https://docs.strapi.io/dev-docs/api/graphql#filters
export const GET_PROFILE_IMAGE = gql`
  query getHeroImage {
    uploadFiles(filters: { name: { contains: "hero-banner-avatar" } }) {
      data {
        id
        attributes {
          name
          alternativeText
          caption
          formats
          url
          width
          height
          size
          mime
        }
      }
    }
  }
`

export const GET_POSTS = gql`
  query getPosts {
    posts {
      data {
        id
        attributes {
          slug
          title
          description
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
