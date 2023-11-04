import { GetStaticPropsContext } from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import type { PostData } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { NoContent } from "components/NoContent"
import { Pagination } from "components/Pagination"

import { fetchPostsPageMeta } from "lib/gql/metaQueries"
import { fetchPosts } from "lib/gql/postQueries"
import { generatePaths } from "lib/path-generator"

const Page = ({
  posts,
  featuredPost,
  currentPage,
  totalPages,
}: {
  posts: PostData[] | []
  featuredPost: PostData | null
  currentPage: number
  totalPages: number
}) =>
  featuredPost ? (
    <PostLayout title="More posts" heroTitle="Down the rabbit hole we go...">
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

export const getStaticPaths = async () => ({
  paths: await generatePaths.BLOG.pages(),
  fallback: false,
})

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { page } = params ?? {}
  if (typeof page !== "string") return { notFound: true }

  const pagination = await fetchPostsPageMeta()
  const posts = await fetchPosts(page)

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0] ?? null

  return {
    props: {
      posts: restPosts,
      featuredPost,
      currentPage: parseInt(page),
      totalPages: pagination.pageCount,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default Page
