import React from 'react'
import Link from 'next/link'

import { Layout } from 'components/layout'

const Blog = () => {
  return (
    <Layout pageType="basic">
      <div>Blog</div>
      <Link href="/blog/placeholder-post">Placeholder Post</Link>
    </Layout>
  )
}
// TODO: Static render slugs
export default Blog
