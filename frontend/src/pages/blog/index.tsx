import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { GET_POSTS } from 'lib/gql'
import { IBlog, IBlogFeature, IPostsData } from 'lib/types'

import { Layout } from 'components/layout'
import { BlogFeature } from 'components/Blog'

const Blog: React.FC<IBlog> = ({ posts, featuredPost }) => {
  console.log(featuredPost)
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

        <BlogFeature attributes={featuredPost.attributes} />

        {/* Remaining Posts */}
        {/* TODO: Create separate component */}
        {/* posts.map((post) => {
          return (
            <PostPreview key={post.id} attributes={post.attributes} />
          )
        }) */}
        <Link href="/blog/placeholder-post">
          <h2 className="text-3xl">Placeholder Post</h2>
        </Link>
        {/* Published 'x days/years/months ago */}
        {/* Description */}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Add pagination...
  const { posts } = await GET_POSTS()

  console.log({ posts })

  const featuredPost: IBlogFeature = posts.data.filter(
    (post: any) => post.attributes.isFeatured === true
  )[0]

  const restPosts: IPostsData[] = posts.data.filter(
    (post: any) => post.attributes.isFeatured !== true
  )

  return {
    props: {
      posts: { ...restPosts },
      featuredPost: { ...featuredPost }
    }
  }
}

export default Blog
