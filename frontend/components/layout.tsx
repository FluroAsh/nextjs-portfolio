import React, { ReactNode } from 'react'
import Navbar from './Navbar'

export interface ILayout {
  children: ReactNode
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* TODO: <Footer/> */}
    </>
  )
}
