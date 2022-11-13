// Used for server-side requests --> (CANNOT use useQuery outside clientside)
// TODO: Add typing for query & variables
const fetchAPI = async (query: string) => {
  // TODO: Replace with env Strapi BE endpoint
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export const GET_POSTS = async () => {
  const data = await fetchAPI(`
  query getPosts {
    posts {
      data {
        id
        attributes {
          title
          description
          content
        }
      }
    }
  `)
  return data
}

export const GET_POST_SLUGS = async () => {
  const data = await fetchAPI(`
    query {
      posts {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `)
  return data
}

export const GET_POST = async (slug: string, preview?: boolean) => {
  const data = await fetchAPI(
    `
    query getPostsBySlug {
      posts(filters: { slug: { eq: "${slug}" } }) {
        data {
          attributes { 
            slug
            title
            description
            content
          }
        }
      }
    }
  `
  )
  return data
}
