import React, { ReactNode } from 'react'
import NavBar from './Nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
