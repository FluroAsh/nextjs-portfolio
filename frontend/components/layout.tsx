import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import { Seo } from './seo'

interface ILayout {
  pageType: pageTypes
  // metaTitle: string
  children: ReactNode
}

type pageTypes = 'home' | 'blog' | 'contact'

export const Layout: React.FC<ILayout> = ({
  pageType,
  // metaTitle,
  children
}) => {
  return (
    <>
      {/* TODO: Update SEO Component */}
      {/* <Seo metaTitle={metaTitle} /> */}
      <Navbar />
      {pageType === 'home' ? (
        <main>{children}</main>
      ) : pageType === 'blog' ? (
        <main>{children}</main>
      ) : pageType === 'contact' ? (
        <main>{children}</main>
      ) : null}
      {/* TODO: <Footer/> */}
    </>
  )
}
