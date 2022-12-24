import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark" lang="en">
      {/* TODO: Add color below as a custom color to TW CSS config */}
      <Head></Head>
      <body className="min-h-screen bg-orange-50 dark:bg-dark-background-primary dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
