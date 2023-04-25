import React, { ReactNode, useEffect } from 'react'
import Navbar from 'components/Navbar'

import { Seo } from './seo'

interface ILayout {
  pageType: pageTypes
  // metaTitle: string
  children: ReactNode
}

type pageTypes = 'basic' | 'blog'

export const Layout: React.FC<ILayout> = ({
  pageType = 'basic',
  // metaTitle,
  children
}) => {
  const [footerHeight, setFooterHeight] = React.useState<number>(0)

  useEffect(() => {
    const footerHeight = document.querySelector('footer')?.clientHeight ?? 0
    setFooterHeight(footerHeight)
  }, [])

  const contentMinHeight = `calc(100vh - ${56 + footerHeight}px`

  return (
    <>
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
          className="flex flex-col items-center justify-center w-full max-w-screen-lg px-5 py-3 mx-auto"
          style={{ minHeight: contentMinHeight }}
        >
          {children}
        </main>
      ) : null}
      {/* TODO: Move to custom component */}
      <div className="h-20" />
      <footer className="flex justify-center bg-cyan-700">
        <div className="w-full max-w-screen-xl p-3 text-center ">
          Footer Placeholder &gt; Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quas quae eaque laboriosam quam veritatis similique
          optio? Magnam omnis asperiores, velit excepturi incidunt cum fugiat
          adipisci nam recusandae ea accusamus corrupti!
        </div>
      </footer>
    </>
  )
}
