import React from 'react'
import Head from 'next/head'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

import type { IPost } from 'lib/types'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { markdownToHtml } from 'lib/markdownToHtml'
import { readingMinutes } from 'lib/utils'
import { initializeApollo } from 'lib/apollo-client'

import { Layout } from 'components/Layout'
import { BlogImage } from 'components/Blog'
import Button from 'components/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/pro-solid-svg-icons'

const BlogPost: React.FC<IPost> = ({
  title,
  content,
  url,
  createdAt,
  alternativeText
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout pageType="basic">
        {/* TODO: Add a loading spinner/bar for SSR */}
        <div>Loading...</div>
      </Layout>
    )
  }

  const stats = readingTime(content)

  return (
    <Layout pageType="blog">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="w-full">
        <div className="py-5 border-b border-orange-300 dark:border-slate-500">
          <Button
            title="Back to Blog"
            href="/blog"
            type="back"
            className="text-orange-300 transition-colors duration-150 group/button hover:text-orange-500 dark:text-slate-500 dark:hover:text-white"
          >
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              size="sm"
              className="group-hover/button:animate-back-and-forth"
            />
            <span className="ml-2">Blog</span>
          </Button>
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          <div className="text-netural-600 dark:text-slate-300">
            {dayjs(createdAt).format('dddd @ h:mm A')} —{' '}
            {readingMinutes(stats.minutes)}
          </div>
        </div>

        <div className="pt-4">
          <BlogImage
            url={url}
            alt={alternativeText}
            fill
            className="object-cover object-center"
          />
        </div>
      </header>

      {/* TODO: Refactor to use MDX over dangerouslySetInnerHTML */}
      <article
        className={`max-w-full w-full mt-5 prose md:w-11/12 dark:prose-invert dark:prose-dark`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  if (!params || typeof params.slug !== 'string' || !params.slug.trim()) {
    return { notFound: true }
  }

  const { slug } = params
  const {
    data: { posts }
  } = await apolloClient.query({
    query: GET_POST,
    variables: { slug }
  })

  const post = posts?.data?.[0]?.attributes
  if (!post) return { notFound: true }

  const { title, content: contentMarkdown, cover, createdAt } = post
  const content = (await markdownToHtml(contentMarkdown)) || ''

  return {
    props: {
      title,
      content,
      url: cover?.data?.attributes?.url,
      createdAt,
      alternativeText: cover?.data?.attributes?.alternativeText
    },
    // Revalidate posts at most once per day
    revalidate: 86400
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts }
  } = await apolloClient.query({ query: GET_POST_SLUGS })

  return {
    paths:
      posts?.data?.attributes?.map(({ slug }: { slug: string }) => ({
        params: { slug }
      })) || [],
    fallback: true
  }
}

export default BlogPost
