import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'pages/_error'
import { GET_POST_SLUGS, GET_POST } from 'lib/gql'
import { IPost } from 'lib/types'

import { markdownToHtml } from 'lib/markdownToHtml'
import { Layout } from 'components/layout'
import Head from 'next/head'

const Post: React.FC<IPost> = ({ title, slug, description, content }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <Error statusCode={404} />
  }

  return (
    <Layout pageType="blog">
      <Head>
        <title>{title}</title>
      </Head>
      {router.isFallback ? (
        <p>Loading...</p>
      ) : (
        // Blog Header component
        // Article body component
        <div className="p-10">
          <li>title: {title}</li>
          <li>description: {description}</li>
          <li>slug: {slug}</li>
          <article dangerouslySetInnerHTML={{ __html: content }}></article>
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
      ...posts.data[0].attributes,
      content
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

export default Post
