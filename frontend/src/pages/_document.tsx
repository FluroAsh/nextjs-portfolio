import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/* TODO: Add color below as a custom color to TW CSS config */}
      <body className="min-h-screen bg-orange-50 dark:bg-dark-background-primary dark:text-white">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
