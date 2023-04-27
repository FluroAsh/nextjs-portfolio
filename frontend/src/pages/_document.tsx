import { Html, Head, Main, NextScript } from 'next/document'
import clsx from 'clsx'

export default function Document() {
  const navbarPaddingTop = 'pt-[56px]'
  return (
    <Html lang="en">
      <Head>{/* TODO: add additional meta tags */}</Head>
      <body
        className={clsx(
          navbarPaddingTop,
          'min-h-screen text-black transition-all duration-300 bg-orange-50 dark:bg-dark-background-primary dark:text-white'
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
