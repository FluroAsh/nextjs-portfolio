import Head from "next/head"

import { MetaTagAttributes } from "types/blog-types"
import { Navbar } from "components/Navbar"

// import useMounted from "hooks/useMounted"

import { Footer } from "../components/Footer"

interface LayoutProps {
  children: React.ReactNode
  title: string
  metaDescription?: string
  metaTags?: MetaTagAttributes
}

const createMetaTag = ([name, content]: [string, string]): React.ReactNode => (
  <meta key={name} property={name} content={content} />
)

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
  metaTags,
}) => {
  const metaTagsArray = metaTags
    ? Object.entries(metaTags).map((meta) => createMetaTag(meta))
    : null

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {metaTagsArray}
      </Head>

      <Navbar />
      {/* FIXME: Having issues with "flex-1" specifically, so have to apply using a style attribute for now.
      Might be relating to hydration or a className clash */}
      <main className="w-100" style={{ flex: "1 1 0" }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
