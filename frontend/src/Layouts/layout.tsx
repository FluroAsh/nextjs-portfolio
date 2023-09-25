import type { ReactNode } from "react"
import Head from "next/head"

import { Navbar } from "components/Navbar"

import { Footer } from "../components/Footer"

interface ILayout {
  type: pageTypes
  children: ReactNode
  title?: string
}

type pageTypes = "basic" | "blog"

export const NAVBAR_HEIGHT = 57
export const FOOTER_HEIGHT = 105

const Layout: React.FC<ILayout> = ({
  type: type = "basic",
  children,
  title,
}) => {
  const mainStyle = {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      {type === "basic" ? (
        <main
          className="w-full"
          // applies immediately, TW has a delay that causes a 'flicker'...
          style={mainStyle}
        >
          {children}
        </main>
      ) : type === "blog" ? (
        <main
          className="flex flex-col items-center justify-between w-full"
          style={mainStyle}
        >
          {children}
        </main>
      ) : null}
      <Footer />
    </>
  )
}

export default Layout
