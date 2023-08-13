import React from "react"
import { GetStaticPropsContext } from "next"
import Link from "next/link"
import { ROUTE_URL } from "constants/paths"
import { PostLayout } from "Layouts/PostLayout"

import { PostData, QueryPosts } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"

import { initializeApollo } from "lib/apollo-client"
import { GET_PAGE_META } from "lib/gql/metaQueries"
import { GET_POSTS } from "lib/gql/postQueries"

const Page = ({
  posts,
  featuredPost,
  currentPage,
  totalPages,
}: {
  posts: PostData[]
  featuredPost: PostData
  postCount: number
  currentPage: number
  totalPages: number
}) => {
  console.log({ currentPage, totalPages })
  return (
    <PostLayout title="More posts" heroTitle="Down the rabbit hole we go...">
      {featuredPost && (
        <BlogFeature
          attributes={featuredPost.attributes}
          categoryData={featuredPost.attributes.categories.data}
        />
      )}

      {posts.map((post) => (
        <BlogPreview
          key={post.id}
          attributes={post.attributes}
          categoryData={post.attributes.categories.data}
        />
      ))}
      <div id="pagination" className="flex justify-center w-full mt-4">
        {currentPage > 1 && (
          <Link
            href={`${ROUTE_URL.BLOG}/${ROUTE_URL.PAGE}/${currentPage - 1}`}
            className="px-5 py-2 border rounded-sm bg-slate-500 border-slate-400 hover:bg-slate-400/80"
          >
            Prev
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`${ROUTE_URL.BLOG}/${ROUTE_URL.PAGE}/${currentPage + 1}`}
            className="px-5 py-2 border rounded-sm bg-slate-500 border-slate-400 hover:bg-slate-400/80"
          >
            Next
          </Link>
        )}
      </div>
    </PostLayout>
  )
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query({ query: GET_PAGE_META })
  const totalPages = meta?.pagination?.pageCount

  const paths = Array(totalPages)
    .fill(0)
    .map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  const { page } = params ?? {}

  if (typeof page !== "string") return { notFound: true }

  const {
    data: {
      posts: { meta },
    },
  } = await apolloClient.query({ query: GET_PAGE_META })

  const { total: postCount, pageCount: totalPages } = meta?.pagination

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POSTS,
    variables: { currentPage: parseInt(page) },
  })

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0]

  return {
    props: {
      posts: restPosts,
      featuredPost,
      postCount,
      currentPage: parseInt(page),
      totalPages,
    },
  }
}

export default Page
