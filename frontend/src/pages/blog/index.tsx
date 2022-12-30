import React from 'react'
import Link from 'next/link'

import { Layout } from 'components/layout'

const Blog = () => {
  return (
    <Layout pageType="basic">
      <div>
        <header className="pb-4 border-b dark:border-slate-500 border-orange-300/50">
          <div className="text-4xl">Latest</div>
          <span className="dark:text-slate-300 text-neutral-600">
            The latest collection of my little musings & articles to help you
            become a better developer.
          </span>
        </header>

        {/* Featured Post */}
        <h2 className="my-2 text-3xl">Featured Post</h2>

        {/* Remaining Posts */}
        <Link href="/blog/placeholder-post">
          <h2 className="text-3xl">Placeholder Post</h2>
        </Link>
        {/* Published 'x days/years/months ago */}
        {/* Description */}
      </div>
    </Layout>
  )
}
// TODO: Static render slugs
export default Blog
