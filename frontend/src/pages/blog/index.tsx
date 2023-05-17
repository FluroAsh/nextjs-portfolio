import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { GET_POSTS } from 'lib/gql'
import { IBlog, IBlogFeature, IPostsData } from 'lib/types'

import { Layout } from 'components/Layout'
import { BlogFeature, BlogPreview } from 'components/Blog'

const Blog: React.FC<IBlog> = ({ posts, featuredPost }) => {
  /** TODO:
   * 1. Create separate component for 'remaining posts'
   * 2. Add pagination and limit page to 5 posts per page (1st page is latest)
   * - When user navigates to next page the title & description should change to 'All Posts'
   * 3. Update Styles for hover & ring effect etc.
   */

  // TODO: Finish pagination implementation
  const [currentPage, setCurrentPage] = useState<number>(1)
  const PAGE_SIZE = 5

  return (
    <Layout pageType="basic">
      <Head>
        <title>Latest Posts</title>
      </Head>

      <div>
        <header className="py-4 border-b dark:border-slate-500 border-orange-300/50">
          <div className="text-4xl">Latest</div>
          <span className="dark:text-slate-300 text-neutral-600">
            The latest collection of my little musings & articles to help you
            become a better developer.
          </span>
        </header>

        {/* NOTE: Might not ALWAYS have a featured post... */}
        {featuredPost && <BlogFeature attributes={featuredPost.attributes} />}

        {posts.map((post: IPostsData) => {
          return <BlogPreview key={post.id} attributes={post.attributes} />
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Add pagination...
  const { posts } = await GET_POSTS()

  const featuredPost: IBlogFeature = posts.data.filter(
    (post: IBlogFeature) => post.attributes.isFeatured === true
  )[0]

  const restPosts: IPostsData[] = posts.data.filter(
    (post: IPostsData) => post.attributes.isFeatured !== true
  )

  return {
    props: {
      posts: restPosts,
      featuredPost: featuredPost ? { ...featuredPost } : null
    }
  }
}

export default Blog
