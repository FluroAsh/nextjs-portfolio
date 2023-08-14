import Head from "next/head"

interface ISeo {
  metaTitle: string
}

export const Seo: React.FC<ISeo> = ({ metaTitle }) => {
  return (
    <Head>
      <title>{metaTitle}</title>
    </Head>
    // TODO: Add/investigate more/better SEO
  )
}
