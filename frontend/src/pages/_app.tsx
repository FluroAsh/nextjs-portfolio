import type { AppProps } from "next/app"
import { Epilogue, PT_Sans, Yellowtail } from "next/font/google"
import Head from "next/head"
import { ThemeProvider } from "next-themes"

import ErrorBoundary from "components/ErrorBoundary"

import ApolloProvider from "lib/ApolloProvider"

import FourZeroFour from "./404"

import "../styles/globals.css"

import clsx from "clsx"

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
  variable: "--font-pt-sans",
})

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yellowtail",
})

const fontVariables = `${ptSans.variable} ${yellowtail.variable}`

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <main className={clsx(fontVariables, "font-ptSans")}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ErrorBoundary fallback={<FourZeroFour />}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ApolloProvider>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </main>
  )
}

export default BlogApp
