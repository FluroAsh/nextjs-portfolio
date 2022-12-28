import type { AppProps } from 'next/app'
import Head from 'next/head'

import ApolloProvider from 'lib/ApolloProvider'
import { ThemeProvider } from 'next-themes'

import '../../globals.css'

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TODO: Add an error boundary */}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default BlogApp
