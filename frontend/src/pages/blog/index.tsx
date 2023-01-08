import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { GET_POSTS } from 'lib/gql'
import { IBlog, IBlogFeature, IPostsData } from 'lib/types'

import { Layout } from 'components/layout'
import { BlogFeature } from 'components/Blog'

const Blog: React.FC<IBlog> = ({ posts, featuredPost }) => {
  /** TODO:
   * 1. Create separate component for 'remaining posts'
   * 2. Add pagination and limit page to 5 posts per page (1st page is latest)
   * - When user navigates to next page the title & description should change to 'All Posts'
   * 3. Update Styles for hover & ring effect etc.
   */
  return (
    <Layout pageType="basic">
      <Head>
        <title>Latest Posts</title>
      </Head>

      <div>
        <header className="pb-4 border-b dark:border-slate-500 border-orange-300/50">
          <div className="text-4xl">Latest</div>
          <span className="dark:text-slate-300 text-neutral-600">
            The latest collection of my little musings & articles to help you
            become a better developer.
          </span>
        </header>

        {/* NOTE: Might not ALWAYS have a featured post... */}
        {featuredPost && <BlogFeature attributes={featuredPost.attributes} />}

        {/* Remaining Posts */}
        {/* TODO: Create separate component */}
        {/* posts.map((post) => {
          return (
            <PostPreview key={post.id} attributes={post.attributes} />
          )
        }) */}

        {/* Published 'x days/years/months ago */}

        {posts.map((post: IPostsData) => {
          return (
            <div
              key={post.id}
              className="py-4 border-b dark:border-slate-500 border-orange-300/50"
            >
              <Link href={`/blog/${post.attributes.slug}`}>
                <h2 className="mb-2 text-3xl">{post.attributes.title}</h2>
              </Link>

              <h3>{post.attributes.createdAt}</h3>
              <p className="mt-2">{post.attributes.description}</p>

              <Link href={`blog/${post.attributes.slug}`}>
                <p className="mt-2">Read more &rarr;</p>
              </Link>
            </div>
          )
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
