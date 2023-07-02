import { useState } from "react"
import { GetStaticProps } from "next"
import Head from "next/head"

import type { PostData } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import Layout from "components/layout"

import { initializeApollo } from "lib/apollo-client"
import { GET_POSTS } from "lib/gql/requests"
import { getPosts } from "lib/utils"

const Blog: React.FC<{ posts: PostData[]; featuredPost: PostData }> = ({
  posts,
  featuredPost,
}) => {
  /** TODO:
   * 1. Create separate component for 'remaining posts'
   * 2. Add pagination and limit page to 5 posts per page (1st page is latest)
   * - When user navigates to next page the title & description should change to 'All Posts'
   * 3. Update Styles for hover & ring effect etc.
   */

  // TODO: Finish pagination implementation
  const [currentPage, setCurrentPage] = useState<number>(1)
  const PAGE_SIZE = 5

  return (
    <Layout type="basic">
      <Head>
        <title>Latest Posts</title>
      </Head>

      <div className="max-w-screen-lg px-5 mx-auto">
        <header className="py-4 border-b dark:border-slate-500 border-orange-300/50">
          <div className="text-4xl font-bold text-neutral-800 dark:text-white">
            Latest
          </div>
          <span className=" dark:text-slate-300 text-neutral-600">
            The latest collection of my little musings & articles to help you
            become a better developer.
          </span>
        </header>

        {featuredPost && (
          <BlogFeature
            attributes={featuredPost.attributes}
            categoryData={featuredPost.attributes.categories.data}
          />
        )}

        {posts.map((post) => {
          return (
            <BlogPreview
              key={post.id}
              attributes={post.attributes}
              categoryData={post.attributes.categories.data}
            />
          )
        })}
      </div>

      {/* NOTE: This should be made its own component */}
      <div className="flex justify-center">
        <div className="mt-5 bg-amber-500 min-w-[300px] text-center text-black">
          Pagination Placeholder
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts },
  } = await apolloClient.query({ query: GET_POSTS })

  // TODO: Add pagination so we're not just returning the first featuredPost
  const featuredPost = getPosts(posts?.data, { isFeatured: true })[0]
  const restPosts = getPosts(posts?.data)

  return {
    props: {
      posts: restPosts,
      featuredPost: featuredPost ? { ...featuredPost } : null,
    },
  }
}

export default Blog
