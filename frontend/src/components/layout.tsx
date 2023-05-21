import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { DIVIDER_HEIGHT, NAVBAR_HEIGHT } from 'constants/pages'

import { Navbar } from 'components/Navbar'

import { Seo } from './seo'

interface ILayout {
  pageType: pageTypes
  // metaTitle: string
  children: ReactNode
}

type pageTypes = 'basic' | 'blog'

const Layout: React.FC<ILayout> = ({
  pageType = 'basic',
  // metaTitle,
  children
}) => {
  const [footerHeight, setFooterHeight] = useState<number>(0)

  useEffect(() => {
    const footerHeight = document.querySelector('footer')?.clientHeight ?? 0
    setFooterHeight(footerHeight)
  }, [])

  const contentMinHeight = `calc(100vh - ${
    NAVBAR_HEIGHT + DIVIDER_HEIGHT + footerHeight
  }px)`

  return (
    <div>
      {/* TODO: Update SEO Component */}
      {/* <Seo metaTitle={metaTitle} /> */}
      <Navbar />
      {pageType === 'basic' ? (
        <main
          className="max-w-screen-lg px-5 mx-auto"
          // applies immediately, TW has a delay that causes a 'flicker'...
          style={{ minHeight: contentMinHeight }}
        >
          {children}
        </main>
      ) : pageType === 'blog' ? (
        <main
          className="flex flex-col items-center w-full max-w-screen-lg px-5 mx-auto"
          style={{ minHeight: contentMinHeight }}
        >
          {children}
        </main>
      ) : null}
      <div className="h-20" />
      {/* TODO: Move to custom component */}
      <footer className="flex justify-center border-t border-orange-300 bg-orange-300/50 dark:bg-sky-700 dark:border-sky-900">
        <div className="w-screen max-w-screen-xl p-3 text-center ">
          Footer Placeholder &gt; Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quas quae eaque laboriosam quam veritatis similique
          optio? Magnam omnis asperiores, velit excepturi incidunt cum fugiat
          adipisci nam recusandae ea accusamus corrupti!
        </div>
      </footer>
    </div>
  )
}

export default Layout
