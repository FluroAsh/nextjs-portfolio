import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { DAILY_REVALIDATION } from "constants/api"
import { PostLayout } from "Layouts/PostLayout"

import type { APICategory, PostData } from "types/api-types"
import { BlogFeature, BlogPreview } from "components/Blog"
import { NoContent } from "components/NoContent"
import { Pagination } from "components/Pagination"

import { fetchCategoryPosts } from "lib/gql/categoryQueries"
import { fetchCategoryPageMeta } from "lib/gql/metaQueries"
import { generatePaths } from "lib/path-generator"

const Page: React.FC<{
  posts: PostData[] | []
  featuredPost: PostData | null
  category: APICategory["attributes"]
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, category, currentPage, totalPages }) =>
  featuredPost ? (
    <PostLayout
      title={`ashleygthompson | ${category.name}`}
      heroTitle={`Latest for ${category.name}`}
      heroDescription={category.description}
      metaDescription={category.metaDescription}
    >
      <BlogFeature
        key={featuredPost.id}
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
        type="category"
        slug={category.slug}
      />
    </PostLayout>
  ) : (
    <NoContent
      text={`🚨 Looks like we don't have anything to show for ${category.name} right now! 💀`}
    />
  )

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await generatePaths.CATEGORY.pages(),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { category: categorySlug, page: currentPage } = params ?? {}

  if (typeof currentPage !== "string" || typeof categorySlug !== "string") {
    return { notFound: true }
  }

  const posts = await fetchCategoryPosts(categorySlug, currentPage)

  // Posts have an associated Category that will match the categorySlug;
  // iterates through the nested Categories properties for the 1st post & retrieves the associated data
  const category = posts.data[0].attributes.categories.data.find(
    ({ attributes }) => attributes?.slug === categorySlug
  )?.attributes

  // NOTE: Not doing a notFound return because we CAN have an empty category published...
  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0] ?? null

  const { page, pageCount } = await fetchCategoryPageMeta(categorySlug)

  return {
    props: {
      category,
      posts: restPosts,
      featuredPost,
      currentPage: page,
      totalPages: pageCount,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default Page
