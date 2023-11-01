import { type ReactNode } from "react"
import Head from "next/head"

import { Navbar } from "components/Navbar"
import useMounted from "hooks/useMounted"

import { Footer } from "../components/Footer"

interface LayoutProps {
  children: ReactNode
  title: string
  metaDescription?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
}) => {
  const isMounted = useMounted() // Fixes hydration error
  return isMounted ? (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Navbar />
      {/* FIXME: Styles are being rendered on the server, so Tailwind classNames applying/generated properly.
          Need to investigate a proper solution for this. */}
      <main className="w-100" style={{ flex: "1 1 0" }}>
        {children}
      </main>
      <Footer />
    </>
  ) : null
}

export default Layout
