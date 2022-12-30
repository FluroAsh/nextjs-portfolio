import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { IPost } from 'lib/types'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { markdownToHtml } from 'lib/markdownToHtml'

import { Layout } from 'components/layout'
import BlogImage from 'components/Blog'

const Post: React.FC<IPost> = ({
  title,
  content,
  imageUrl,
  createdAt,
  altText
}) => {
  const router = useRouter()

  const styles = {
    article: {
      a: `prose-a:transition prose-a:duration-150 prose-a:no-underline   
          dark:prose-a:text-sky-700 dark:hover:prose-a:text-sky-500 prose-a:text-amber-500 hover:prose-a:text-orange-500`
    }
  }

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

      <header className="w-full mt-5">
        <Link
          href="/blog/"
          className="no-underline transition duration-150 text-neutral-500 dark:text-neutral-400 hover:dark:text-white hover:text-black"
        >
          &larr; Back to Blog
        </Link>
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {/* TODO: Implement X minute read feature using moment-js */}
        <div className="py-2 text-neutral-500 dark:text-neutral-400">
          10 minute read
        </div>

        <BlogImage
          url={process.env.NEXT_PUBLIC_STRAPI_API_URL + imageUrl}
          alt={altText}
          fill
          className="object-cover object-center rounded-md shadow-lg"
        />
      </header>

      {/* TODO: Add time to read & createdAt date */}
      <article
        className={`max-w-full mt-5 prose prose-lg md:w-4/5 sm:px-2 dark:prose-invert ${styles.article.a}`}
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
        attributes: { url: imageUrl, alternativeText: altText }
      }
    },
    createdAt
  } = posts.data[0].attributes
  const content = (await markdownToHtml(contentMarkdown)) || ''

  return {
    props: {
      title,
      content,
      imageUrl,
      createdAt,
      altText
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
