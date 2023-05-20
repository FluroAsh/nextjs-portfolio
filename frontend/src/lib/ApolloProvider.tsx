import {
  ApolloProvider as Apollo
} from '@apollo/client'

import { ReactNode } from 'react'
import { initializeApollo } from './apollo-client'

function ApolloProvider({ children }: { children: ReactNode }) {
  const client = initializeApollo()

  return <Apollo client={client}>{children}</Apollo>
}

export default ApolloProvider
