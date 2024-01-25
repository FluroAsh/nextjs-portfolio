import type { ServerResponse } from "http"
import { ROUTE_URL } from "constants/paths"

import { fetchHomePosts } from "lib/gql/postQueries"
import {
  generatePaths,
  type GeneratorBlogPages,
  type GeneratorBlogSlugs,
  type GeneratorCategoryPages,
  type GeneratorCategorySlugs,
} from "lib/path-generator"

const CURRENT_ISO_DATE = new Date().toISOString()

type ReducedHomePosts = { params: { slug: string } }[]

type SiteMapProps = {
  post: {
    slugs: GeneratorBlogSlugs
    latestPosts: GeneratorBlogSlugs
    homePosts: ReducedHomePosts
    pages: GeneratorBlogPages
  }
  category: {
    slugs: GeneratorCategorySlugs
    pages: GeneratorCategoryPages
  }
}

const generateUrlXml = (loc: string, priority: number) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_ISO_DATE}</lastmod>
    <priority>${priority.toFixed(2)}</priority>
  </url>
`

// prettier-ignore
const generateSiteMap = ({ post, category }: SiteMapProps) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${generateUrlXml(process.env.NEXT_BASE_URL as string, 1)}
    ${generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}`, 0.9)}
    ${post.homePosts.map(({ params: { slug } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`, 0.85)).join("")}
    ${post.latestPosts.map(({ params: { slug } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`, 0.75)).join("")}
    ${post.slugs.map(({ params: { slug } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`, 0.7)).join("")}
    ${post.pages.map(({ params: { page } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/page/${page}`, 0.6)).join("")}
    ${category.slugs.map(({ params: { category } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.CATEGORY}/${category}`, 0.65)).join("")}
    ${category.pages.map(({ params: { category, page } }) => generateUrlXml(`${process.env.NEXT_BASE_URL}${ROUTE_URL.CATEGORY}/${category}/page/${page}`, 0.45)).join("")}
  </urlset>
`

export default function SiteMap() {
  return null
}

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  const slugs = await generatePaths.BLOG.slugs()
  const homePostData = await fetchHomePosts()

  const homePosts = homePostData.data.reduce((acc, { attributes }) => {
    const obj = { params: { slug: attributes.slug } }
    return [...acc, obj]
  }, [] as ReducedHomePosts)

  const sitemap = generateSiteMap({
    post: {
      slugs: slugs.slice(3),
      latestPosts: slugs.slice(0, 3),
      homePosts,
      pages: await generatePaths.BLOG.pages(),
    },
    category: {
      slugs: await generatePaths.CATEGORY.slugs(),
      pages: await generatePaths.CATEGORY.pages(),
    },
  })

  // Send the XML off to the browser in the response! 🚀
  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
