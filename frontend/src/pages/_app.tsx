import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "next-themes"

import ErrorBoundary from "components/ErrorBoundary"

import ApolloProvider from "lib/ApolloProvider"

import FourZeroFour from "./404"

import "../styles/globals.css"

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<FourZeroFour />}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default BlogApp
