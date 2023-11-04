import { fetchCategorySlugs } from "./gql/categoryQueries"
import { fetchCategoryPageMeta, fetchPostsPageMeta } from "./gql/metaQueries"
import { fetchPostSlugs } from "./gql/postQueries"

// TODO: Clean up these types or restructure the response so they can be simplified
export type GeneratorCategorySlugs = Awaited<
  ReturnType<typeof generatePaths.CATEGORY.slugs>
>
export type GeneratorCategoryPages = Awaited<
  ReturnType<typeof generatePaths.CATEGORY.pages>
>
export type GeneratorBlogSlugs = Awaited<
  ReturnType<typeof generatePaths.BLOG.slugs>
>
export type GeneratorBlogPages = Awaited<
  ReturnType<typeof generatePaths.BLOG.pages>
>

export const generatePaths = Object.freeze({
  CATEGORY: {
    slugs: async () => {
      const categories = await fetchCategorySlugs()
      return categories?.data?.map(({ attributes: { slug } }) => ({
        params: {
          category: slug,
        },
      }))
    },
    pages: async () => {
      const categories = await fetchCategorySlugs()

      // NOTE: Must be awaited with Promise.all due to multiple GQL queries for EACH category returning individual promises
      const paths = await Promise.all(
        categories?.data?.map(async ({ attributes: { slug } }) => {
          const { pageCount } = await fetchCategoryPageMeta(slug)
          return Array.from({ length: pageCount }, (_, idx) => ({
            params: {
              category: slug,
              page: `${idx + 1}`,
            },
          }))
        })
      )
      return paths.flat()
    },
  },
  BLOG: {
    slugs: async () => {
      const posts = await fetchPostSlugs()
      return posts?.data?.map(({ attributes: { slug } }) => ({
        params: { slug },
      }))
    },
    pages: async () => {
      const { pageCount } = await fetchPostsPageMeta()
      return Array.from({ length: pageCount }, (_, page) => ({
        params: {
          page: `${page + 1}`,
        },
      }))
    },
  },
})
