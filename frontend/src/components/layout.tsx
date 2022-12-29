import React, { ReactNode } from 'react'
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
  return (
    <>
      {/* TODO: Update SEO Component */}
      {/* <Seo metaTitle={metaTitle} /> */}
      <Navbar />
      {pageType === 'basic' ? (
        <main>{children}</main>
      ) : pageType === 'blog' ? (
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      ) : null}
      {/* TODO: <Footer/> */}
    </>
  )
}
