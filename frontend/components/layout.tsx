import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import Seo from './seo'

interface ILayout {
  children: ReactNode
  metaTitle: string
}
const Layout: React.FC<ILayout> = ({ children, metaTitle }) => {
  return (
    <>
      <Seo metaTitle={metaTitle} />
      <Navbar />
      <main>{children}</main>
      {/* TODO: <Footer/> */}
    </>
  )
}

export default Layout
