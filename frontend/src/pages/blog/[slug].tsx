import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'pages/_error'
import { GET_POST_SLUGS, GET_POST } from 'pages/api'
import { IPostData } from 'interfaces'

import { markdownToHtml } from 'lib/markdownToHtml'
import { Layout } from 'components/layout'
import Head from 'next/head'

export default function Post({ post }: IPostData) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <Error statusCode={404} />
  }

  return (
    <Layout pageType="blog">
      <Head>
        <title>{post?.title}</title>
      </Head>
      {router.isFallback ? (
        <p>Loading...</p>
      ) : (
        // Blog Header component
        // Article body component
        <div className="p-10">
          <li>title: {post.title}</li>
          <li>description: {post.description}</li>
          <li>slug: {post.slug}</li>
          <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
        </div>
      )}
    </Layout>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (ctx, preview = false) => {
  const { slug } = ctx.params as IParams
  const { posts } = await GET_POST(slug, preview)
  const content =
    (await markdownToHtml(posts.data[0]?.attributes?.content)) || ''

  return {
    props: {
      post: {
        ...posts.data[0].attributes,
        content
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await GET_POST_SLUGS()

  return {
    paths:
      posts?.data?.attributes?.map(
        ({ slug }: { slug: string }) => `/blog/${slug}`
      ) || [],
    fallback: true
  }
}