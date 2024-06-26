import { ApolloClient, InMemoryCache } from "@apollo/client"

export function initializeApollo() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
    cache: new InMemoryCache(),
  })

  return client
}
