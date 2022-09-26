import theme from '../shared/theme'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
// extending theme: https://chakra-ui.com/getting-started/nextjs-guide#customizing-theme

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // TODO: Fix theme to be user default
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
