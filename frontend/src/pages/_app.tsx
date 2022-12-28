import type { AppProps } from 'next/app'

import ApolloProvider from 'lib/ApolloProvider'
import { ThemeProvider } from 'next-themes'

import '../../globals.css'

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TODO: Add an error boundary */}
      <ApolloProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default BlogApp
