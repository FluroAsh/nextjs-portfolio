import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { Layout } from 'components/layout'

import { IPost } from 'lib/types'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { markdownToHtml } from 'lib/markdownToHtml'
import BlogImage from 'components/Blog'

const Post: React.FC<IPost> = ({ title, content }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout pageType="basic">
        {/* TODO: Add a loading spinner/bar */}
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout pageType="blog">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="w-full max-w-screen-lg mx-auto mt-5 max-sm:mx-2">
        <Link
          href="/blog/"
          className="no-underline transition duration-150 dark:text-neutral-500 hover:dark:text-white"
        >
          &larr; Back to Blog
        </Link>
        <h2 className="text-xl md:text-3xl">{title}</h2>

        {/* TODO: Set up in Strapi to dynamically get Cover image */}
        {/* PLACEHOLDER! */}
        <BlogImage
          url="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="placeholder"
          fill
          className="object-cover bg-center"
        />
      </header>

      {/* TODO: Add time to read & published date */}
      <article
        className="max-w-screen-lg px-5 mt-5 prose w-50 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

// TODO: Refactor to use gql queries & client in apollo-client
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { posts } = await GET_POST(slug)

  if (!posts.data.length) {
    return { notFound: true }
  }

  const {
    title,
    content: contentMarkdown,
    cover: {
      data: {
        attributes: { url }
      }
    },
    published
  } = posts.data[0].attributes
  const content = (await markdownToHtml(contentMarkdown)) || ''

  console.log({ url, published })

  return {
    props: {
      title,
      content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await GET_POST_SLUGS()

  return {
    paths:
      posts?.data?.attributes?.map(({ slug }: { slug: string }) => ({
        params: { slug }
      })) || [],
    fallback: true
  }
}

export default Post
