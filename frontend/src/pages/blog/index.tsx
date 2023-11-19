import type { GetStaticProps } from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import type { PostData } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { NoContent } from "components/NoContent"
import { Pagination } from "components/Pagination"

import { fetchPostsPageMeta } from "lib/gql/metaQueries"
import { fetchPosts } from "lib/gql/postQueries"

export const blogMetaDescription =
  "Explore the latest in TypeScript, NextJS, JavaScript, Remix, and CSS on Ash's tech blog. Dive into insightful articles, tutorials, and best practices for full-stack development. Stay ahead in the dynamic world of web development with my in-depth, expertly curated content."

const Blog: React.FC<{
  posts: PostData[] | []
  featuredPost: PostData | null
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, currentPage, totalPages }) =>
  featuredPost ? (
    <PostLayout
      title="ashleygthompson | Latest Posts"
      metaDescription={blogMetaDescription}
    >
      <BlogFeature
        attributes={featuredPost.attributes}
        categoryData={featuredPost.attributes.categories.data}
      />

      {posts.length > 0 &&
        posts.map((post) => (
          <BlogPreview
            key={post.id}
            attributes={post.attributes}
            categoryData={post.attributes.categories.data}
            type="text"
          />
        ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        type="blog"
      />
    </PostLayout>
  ) : (
    <NoContent />
  )

export const getStaticProps: GetStaticProps = async () => {
  const { page, pageCount } = await fetchPostsPageMeta()
  const posts = await fetchPosts(page)

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0] ?? null

  return {
    props: {
      posts: restPosts,
      featuredPost,
      currentPage: page,
      totalPages: pageCount,
    },
    revalidate: DAILY_REVALIDATION,
  }
}
export default Blog
