import { Head, Html, Main, NextScript } from "next/document"
import { Favicons } from "static/Favicons"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicons />
      </Head>
      <body className="text-neutral-700 dark:text-white bg-neutral-100 dark:bg-dark-background-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
