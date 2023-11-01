import type { AppProps } from "next/app"
import { PT_Sans, Yellowtail } from "next/font/google"
import Head from "next/head"
import { ThemeProvider } from "next-themes"

import ApolloProvider from "lib/ApolloProvider"

import "../styles/globals.css"

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

function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={cn(fontVariables, "font-ptSans flex flex-col min-h-screen")}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta
          property="og:title"
          content="Ashley G. Thompsons digital garden"
        />
        <meta
          property="og:description"
          content="Some description for the website"
        />
        <meta
          property="og:image"
          content="https://at-strapi-blog.s3.ap-southeast-2.amazonaws.com/static-assets/og-image.png"
        /> */}
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
