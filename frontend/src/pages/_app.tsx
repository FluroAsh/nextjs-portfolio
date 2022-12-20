import '../../globals.css'

import ApolloProvider from 'lib/ApolloProvider'
import type { AppProps } from 'next/app'

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default BlogApp
