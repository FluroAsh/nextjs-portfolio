import Head from "next/head"

import { MetaTagAttributes } from "types/blog-types"
import { Footer } from "components/Footer"
import { Navbar } from "components/Navbar"

interface LayoutProps {
  children: React.ReactNode
  title: string
  metaDescription?: string
  metaTags?: MetaTagAttributes
}

const createMetaTag = ([name, content]: [string, string]): React.ReactNode =>
  name.startsWith("og:") ? (
    <meta key={name} property={name} content={content} />
  ) : (
    <link rel="canonical" href={content} />
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
      <main className="w-100 flex flex-col flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
