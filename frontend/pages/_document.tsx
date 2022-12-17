import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/* TODO: Add color below as a custom color to TW CSS config */}
      <Head></Head>
      <body className="dark:bg-[#2d373c] min-h-screen dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
