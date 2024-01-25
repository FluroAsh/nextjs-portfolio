import { fetchCategorySlugs } from "./gql/categoryQueries"
import { fetchCategoryPageMeta, fetchPostsPageMeta } from "./gql/metaQueries"
import { fetchPostSlugs } from "./gql/postQueries"

type PathType = "CATEGORY" | "BLOG"
type PathMethod = "slugs" | "pages"

type GeneratorType<T extends PathType, M extends PathMethod> = Awaited<
  ReturnType<(typeof generatePaths)[T][M]>
>

export type GeneratorCategorySlugs = GeneratorType<"CATEGORY", "slugs">
export type GeneratorCategoryPages = GeneratorType<"CATEGORY", "pages">
export type GeneratorBlogSlugs = GeneratorType<"BLOG", "slugs">
export type GeneratorBlogPages = GeneratorType<"BLOG", "pages">

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
