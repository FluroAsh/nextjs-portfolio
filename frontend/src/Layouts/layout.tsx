import type { ReactNode } from "react"
import Head from "next/head"

import { Navbar } from "components/Navbar"

import { Footer } from "../components/Footer"

interface ILayout {
  type: pageTypes
  children: ReactNode
  title: string
  metaDescription?: string
}

type pageTypes = "basic" | "blog"

export const NAVBAR_HEIGHT = 57
export const FOOTER_HEIGHT = 105

const Layout: React.FC<ILayout> = ({
  type: type = "basic",
  children,
  title,
  metaDescription,
}) => {
  const layoutStyle = {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Navbar />
      {type === "basic" ? (
        <div
          className="w-full"
          // applies immediately, TW has a delay that causes a 'flicker'...
          style={layoutStyle}
        >
          {children}
        </div>
      ) : type === "blog" ? (
        <div
          className="flex flex-col items-center justify-between w-full"
          style={layoutStyle}
        >
          {children}
        </div>
      ) : null}
      <Footer />
    </>
  )
}

export default Layout
