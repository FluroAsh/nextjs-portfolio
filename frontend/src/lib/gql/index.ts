import client from 'lib/apollo-client'
import { gql } from '@apollo/client'

export const GET_POSTS = async () => {
  const { data } = await client.query({
    query: gql`
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
  })
  return data
}

export const GET_POST_SLUGS = async () => {
  const { data } = await client.query({
    query: gql`
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
  })
  return data
}

export const GET_POST = async (slug: string) => {
  const { data } = await client.query({
    query: gql`
    query getPostsBySlug {
      posts(filters: { slug: { eq: "${slug}" } }) {
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
                }
              }
            }
            createdAt
          }
        }
      }
    }
  `
  })
  return data
}
