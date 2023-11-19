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

import { fetchCategory, fetchCategoryPosts } from "lib/gql/categoryQueries"
import { fetchCategoryPageMeta } from "lib/gql/metaQueries"
import { generatePaths } from "lib/path-generator"

const CategoryPage: React.FC<{
  posts: PostData[] | []
  featuredPost: PostData | null
  category: APICategory["attributes"]
  currentPage: number
  totalPages: number
}> = ({ posts, featuredPost, category, currentPage, totalPages }) =>
  featuredPost ? (
    <PostLayout
      title={`ashleygthompson | ${category.name} Posts`}
      metaDescription={category.metaDescription}
      heroTitle={`Latest for ${category.name}`}
      heroDescription={category.description}
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
  paths: await generatePaths.CATEGORY.slugs(),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { category: categorySlug } = params ?? {}
  if (typeof categorySlug !== "string") return { notFound: true }

  const { page, pageCount } = await fetchCategoryPageMeta(categorySlug)
  const posts = await fetchCategoryPosts(categorySlug, page)

  const slugCategories = await fetchCategory(categorySlug) // Returns one category as slug must be an EXACT match

  const restPosts = posts.data.slice(1)
  const featuredPost = posts.data[0] ?? null
  const category = slugCategories.data[0]?.attributes

  return {
    props: {
      posts: restPosts,
      featuredPost,
      category,
      currentPage: page,
      totalPages: pageCount,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default CategoryPage
