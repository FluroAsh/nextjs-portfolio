import Head from 'next/head'
import React from 'react'

interface ISeo {
  metaTitle: string
}

const Seo: React.FC<ISeo> = ({ metaTitle }) => {
  return (
    <Head>
      <title>{metaTitle}</title>
    </Head>
  )
}

export default Seo
