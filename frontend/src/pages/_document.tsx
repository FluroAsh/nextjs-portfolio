import { Head, Html, Main, NextScript } from "next/document"
import { Favicons } from "static/Favicons"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicons />
      </Head>
      <body className="text-black transition-all duration-300 bg-orange-50 dark:bg-dark-background-primary dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
