import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { GET_POSTS } from 'lib/gql'
import { IPostsData } from 'lib/types'

import { Layout } from 'components/layout'
import Image from 'next/image'

// Update types for IBlog
const Blog = ({
  posts,
  featuredPost
}: {
  posts: any
  featuredPost: IPostsData
}) => {
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

        {/* Featured Post */}
        {/* TODO: Create separate component */}
        <div className="py-4 border-b dark:border-slate-500 border-orange-300/50">
          <div className="relative max-w-full h-60 sm:h-[20rem] md:h-96">
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                featuredPost.attributes.cover.data.attributes.url
              }
              alt={
                featuredPost.attributes.cover.data.attributes.alternativeText
              }
              fill
              className="object-cover border rounded shadow-lg border-slate-500"
            />
          </div>
          <Link href={`blog/${featuredPost.attributes.slug}`}>
            <h2 className="my-2 text-3xl">{featuredPost.attributes.title}</h2>
          </Link>
          <div>Posted {featuredPost.attributes.createdAt}</div>
          <p>{featuredPost.attributes.title}</p>
        </div>
        {/* <FeaturedPost data={featuredPost.attributes}/> */}

        {/* Remaining Posts */}
        {/* TODO: Create separate component */}
        {/* posts.map((post) => {
          return (
            <Post key={post.id} data={post.attributes} />
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

  const featuredPost = posts.data.filter(
    (post: IPostsData) => post.attributes.isFeatured === true
  )

  const restPosts = posts.data.filter(
    (post: IPostsData) => post.attributes.isFeatured !== true
  )

  return {
    props: {
      posts: { ...restPosts.data },
      featuredPost: { ...featuredPost[0] }
    }
  }
}

export default Blog
