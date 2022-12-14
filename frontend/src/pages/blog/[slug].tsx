import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { IPost } from 'lib/types'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { markdownToHtml } from 'lib/markdownToHtml'

import { Layout } from 'components/layout'
import { BlogImage } from 'components/Blog'

const BlogPost: React.FC<IPost> = ({
  title,
  content,
  url,
  createdAt,
  alternativeText
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
        <div className="pb-4 border-b border-orange-300 dark:border-slate-500">
          <Link
            href="/blog/"
            className="no-underline transition duration-150 text-neutral-600 dark:text-neutral-300 hover:dark:text-white hover:text-black"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          {/* TODO: Implement X minute read feature using moment-js */}
          <div className=" text-neutral-500 dark:text-neutral-300">
            10 minute read
          </div>
        </div>

        <div className="pt-4">
          <BlogImage
            url={process.env.NEXT_PUBLIC_STRAPI_API_URL + url}
            alt={alternativeText}
            fill
            className="object-cover object-center bg-center rounded-lg shadow-lg dark:border dark:border-slate-500"
          />
        </div>
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
        attributes: { url, alternativeText }
      }
    },
    createdAt
  } = posts.data[0].attributes
  const content = (await markdownToHtml(contentMarkdown)) || ''

  return {
    props: {
      title,
      content,
      url,
      createdAt,
      alternativeText
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

export default BlogPost
