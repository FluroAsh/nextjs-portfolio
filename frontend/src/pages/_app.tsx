import type { AppProps } from "next/app"
import { PT_Sans, Yellowtail } from "next/font/google"
import Head from "next/head"
import { ThemeProvider } from "next-themes"

import ApolloProvider from "lib/ApolloProvider"

import "../styles/globals.css"

import { config } from "@fortawesome/fontawesome-svg-core"

import "@fortawesome/fontawesome-svg-core/styles.css" // Manual import to prevent FA SSR resizing bug

import { cn } from "lib/utils"

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
config.autoAddCss = false // prevents FA auto importing CSS

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={cn(fontVariables, "font-ptSans flex flex-col min-h-screen")}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="y2tiPk1sHCumAavN_3TB0QiPPnP59xT2juX5nQnb-Do"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </div>
  )
}

export default BlogApp
