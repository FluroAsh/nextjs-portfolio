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

export const GET_POSTS_BY_CATEGORY = gql`
  query getPostsByCategory($slug: String!) {
    posts(filters: { categories: { slug: { eq: $slug } } }) {
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
          isFeatured
        }
      }
    }
  }
`

export const GET_CATEGORY = gql`
  query getCategorBySlug($slug: String!) {
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
