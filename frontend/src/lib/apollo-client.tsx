import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
  cache: new InMemoryCache()
})

export default client
