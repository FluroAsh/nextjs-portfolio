import React from "react"
import type { ReactNode } from "react"
import Head from "next/head"
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "constants/pages"

import { Navbar } from "components/Navbar"

import { Footer } from "../components/Footer"

interface ILayout {
  type: pageTypes
  children: ReactNode
  title?: string
}

type pageTypes = "basic" | "blog"

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
          className="flex flex-col items-center w-full justify-between"
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
