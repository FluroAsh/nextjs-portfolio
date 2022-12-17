import '../main.css'
import Layout from 'layouts'

import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
  cache: new InMemoryCache()
})

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  )
}

export default BlogApp
