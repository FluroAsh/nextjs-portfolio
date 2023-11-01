import Head from "next/head"

import { MetaTagAttributes } from "types/blog-types"
import { Navbar } from "components/Navbar"
import useMounted from "hooks/useMounted"

import { Footer } from "../components/Footer"

interface LayoutProps {
  children: React.ReactNode
  title: string
  metaDescription?: string
  metaTags?: MetaTagAttributes
}

const createMetaTag = ([name, content]: [string, string]): React.ReactNode => (
  <meta name={name} content={content} />
)

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
  metaTags,
}) => {
  const isMounted = useMounted() // Fixes hydration error
  return isMounted ? (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {metaTags &&
          Object.entries(metaTags).map((meta) => createMetaTag(meta))}
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
