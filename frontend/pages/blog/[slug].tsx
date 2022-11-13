import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'

import Error from 'pages/_error'
import { GET_POST_SLUGS, GET_POST } from 'pages/api'
import { IPostData } from 'interfaces'

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
        <div className="p-10 text-white">
          <li>title: {post.title}</li>
          <li>description: {post.description}</li>
          <li>slug: {post.slug}</li>
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
  // const content = await markdownToHtml(data?.posts[0[]?.content || ''])

  const { posts } = await GET_POST(params.slug)

  return {
    props: {
      post: {
        ...posts.data[0].attributes
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
