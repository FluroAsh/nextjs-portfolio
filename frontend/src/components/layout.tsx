import React, { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { DIVIDER_HEIGHT, NAVBAR_HEIGHT } from "constants/pages"

import { Navbar } from "components/Navbar"

import { Footer } from "./Footer"
import { Seo } from "./seo"

interface ILayout {
  type: pageTypes
  // metaTitle: string
  children: ReactNode
}

type pageTypes = "basic" | "blog"

const Layout: React.FC<ILayout> = ({
  type: type = "basic",
  // metaTitle,
  children,
}) => {
  const footerRef = useRef<HTMLDivElement>(null)

  const contentMinHeight = `calc(100vh - ${
    NAVBAR_HEIGHT + DIVIDER_HEIGHT + (footerRef?.current?.clientHeight ?? 0)
  }px)`

  return (
    <div>
      {/* TODO: Update SEO Component */}
      {/* <Seo metaTitle={metaTitle} /> */}
      <Navbar />
      {type === "basic" ? (
        <main
          className="w-full"
          // applies immediately, TW has a delay that causes a 'flicker'...
          style={{ minHeight: contentMinHeight }}
        >
          {children}
        </main>
      ) : type === "blog" ? (
        <main
          className="flex flex-col items-center w-full "
          style={{ minHeight: contentMinHeight }}
        >
          {children}
        </main>
      ) : null}
      <div className="h-20" />
      <Footer ref={footerRef} />
    </div>
  )
}

export default Layout
