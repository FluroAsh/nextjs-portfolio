import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'

import Error from 'pages/_error'
import { GET_POST_SLUGS, GET_POST } from 'pages/api'
import { IPostData } from 'interfaces'
import { markdownToHtml } from 'lib/markdownToHtml'

export default function Post({ post }: IPostData) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <Error statusCode={404} />
  }

  return (
    <>
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
    </>
  )
}

// TODO: Add types for params, preview
export const getStaticProps: GetStaticProps = async ({
  params,
  preview = null
}: any) => {
  const { posts } = await GET_POST(params.slug)
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
      posts?.data?.map(({ attributes: { slug } }: any) => `/blog/${slug}`) ||
      [],
    fallback: true
  }
}
