import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* TODO: <Footer/> */}
    </>
  )
}
