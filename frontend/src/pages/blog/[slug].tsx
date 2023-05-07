import React from 'react'
import Head from 'next/head'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

import type { IPost } from 'lib/types'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { markdownToHtml } from 'lib/markdownToHtml'
import { readingMinutes } from 'helpers/helpers'

import { Layout } from 'components/layout'
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
            href="/blog"
            type="back"
            className="group/button text-slate-500 hover:text-white transition-colors duration-150"
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
