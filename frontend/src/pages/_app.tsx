import type { AppProps } from 'next/app'

import ApolloProvider from 'lib/ApolloProvider'
import '../../globals.css'

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TODO: Add an error boundary */}
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default BlogApp
