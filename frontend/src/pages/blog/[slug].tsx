import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { faArrowLeftLong } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DAILY_REVALIDATION } from "constants/api"
import readingTime from "reading-time"

import type { BlogPostProps } from "types/blog-types"
import { BlogImage } from "components/Blog"
import Button from "components/Button"
import Layout from "components/layout"
import { TimeDate } from "components/TimeDate"

import { initializeApollo } from "lib/apollo-client"
import { GET_POST, GET_POST_SLUGS } from "lib/gql/requests"
import { markdownToHtml } from "lib/markdownToHtml"

import "highlight.js/styles/base16/monokai.css"

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  content,
  createdAt,
  alternativeText,
  formats,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout type="basic">
        {/* TODO: Add a loading spinner/bar for SSR */}
        <div>Loading...</div>
      </Layout>
    )
  }

  const stats = readingTime(content)

  return (
    <Layout type="blog">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="w-full max-w-screen-lg px-5">
        <div className="py-5 border-b border-orange-300 dark:border-slate-500">
          <Button
            title="Back to Blog"
            href="/blog"
            type="back"
            className="text-orange-400 transition-colors group hover:text-orange-300 dark:text-neutral-400 dark:hover:text-white"
          >
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              size="sm"
              className="group-hover:animate-back-and-forth"
            />
            <span className="ml-2">Blog</span>
          </Button>
          {/* REVIEW: Should refactor this h1 to use BlogTitle... */}
          <h1 className="text-3xl font-bold sm:text-4xl text-neutral-800 dark:text-white">
            {title}
          </h1>
          <TimeDate createdAt={createdAt} minutes={stats.minutes} type="post" />
        </div>

        <div className="pt-4">
          <BlogImage alt={alternativeText} formats={formats} />
        </div>
      </header>

      {/* REVIEW: Refactoring to use MDX over CMS Markdown */}
      {/* TODO: Add a 'copy code' button + hook for code content inside <code/> blocks 
      (Have a look into https://www.npmjs.com/package/markdown-to-jsx for HTML -> JSX Overrides -- custom code block/components anyone?)
      */}
      <article
        className="w-full max-w-screen-lg px-5 pt-5 mx-auto prose md:w-11/12 dark:prose-invert dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  if (!params || typeof params.slug === "undefined") return { notFound: true }

  const { slug } = params
  const {
    data: { posts },
  } = await apolloClient.query({
    query: GET_POST,
    variables: { slug },
  })

  const post = posts?.data?.[0]?.attributes
  if (!post) return { notFound: true }

  const { title, content: contentMarkdown, cover, createdAt } = post
  const content = await markdownToHtml(contentMarkdown)

  return {
    props: {
      title,
      content,
      createdAt,
      alternativeText: cover?.data?.attributes?.alternativeText,
      formats: cover?.data?.attributes?.formats,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts },
  } = await apolloClient.query({ query: GET_POST_SLUGS })

  return {
    paths:
      posts?.data?.attributes?.map(({ slug }: { slug: string }) => ({
        params: { slug },
      })) || [],
    fallback: true,
  }
}

export default BlogPost
