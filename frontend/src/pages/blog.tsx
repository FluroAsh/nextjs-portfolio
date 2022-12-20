import React from 'react'
import Link from 'next/link'

import { Layout } from 'components/layout'

const Blog = () => {
  return (
    <Layout pageType="simple">
      <div>Blog</div>
      <Link href="/blog/placeholder-post">Placeholder Post</Link>
    </Layout>
  )
}

export default Blog
