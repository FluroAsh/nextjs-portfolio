import type { AppProps } from 'next/app'
import Head from 'next/head'

import ApolloProvider from 'lib/ApolloProvider'
import { ThemeProvider } from 'next-themes'

import ErrorBoundary from 'components/ErrorBoundary'
import FourZeroFour from './404'
import '../../globals.css'

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<FourZeroFour />}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default BlogApp
