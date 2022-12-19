// Used for server-side requests --> (CANNOT use useQuery outside clientside)
// TODO: Add typing for query & variables
const fetchAPI = async (query: string) => {
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
  console.log(json.data)
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export const GET_POSTS = async () => {
  return await fetchAPI(`
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
}

export const GET_POST_SLUGS = async () => {
  return await fetchAPI(`
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
}

export const GET_POST = async (slug: string, preview?: boolean) => {
  return await fetchAPI(`
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
  `)
}
