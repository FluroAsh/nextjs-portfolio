import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Apollo
} from '@apollo/client'

import { ReactNode } from 'react'

function ApolloProvider({ children }: { children: ReactNode }) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
    cache: new InMemoryCache()
  })

  return <Apollo client={client}>{children}</Apollo>
}

export default ApolloProvider
