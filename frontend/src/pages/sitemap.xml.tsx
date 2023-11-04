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

const generateSiteMap = ({ post, category }: SiteMapProps) =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.NEXT_BASE_URL}</loc>
       <lastmod>${CURRENT_ISO_DATE}</lastmod>
       <priority>1.00</priority>
     </url>
     <url>
       <loc>${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}</loc>
       <lastmod>${CURRENT_ISO_DATE}</lastmod>
       <priority>0.90</priority>
     </url>


    ${post.homePosts
      .map(
        ({ params: { slug } }) => `
      <url>
        <loc>${`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`}</loc>
        <lastmod>${CURRENT_ISO_DATE}</lastmod>
        <priority>0.85</priority>
      </url>
      `
      )
      .join("")}  

     ${post.latestPosts
       .map(
         ({ params: { slug } }) => `
        <url>
            <loc>${`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`}</loc>
            <lastmod>${CURRENT_ISO_DATE}</lastmod>
            <priority>0.75</priority>
        </url>`
       )
       .join("")}

    ${post.slugs
      .map(
        ({ params: { slug } }) => `
      <url>
          <loc>${`${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug}`}</loc>
          <lastmod>${CURRENT_ISO_DATE}</lastmod>
          <priority>0.70</priority>
      </url>`
      )
      .join("")}

      ${post.pages
        .map(
          ({ params: { page } }) => `
      <url>
          <loc>${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${page}</loc>
          <lastmod>${CURRENT_ISO_DATE}</lastmod>
          <priority>0.60</priority>
      </url>`
        )
        .join("")}

      ${category.slugs
        .map(
          ({ params: { category } }) => `
      <url>
          <loc>${process.env.NEXT_BASE_URL}${ROUTE_URL.CATEGORY}/${category}</loc>
          <lastmod>${CURRENT_ISO_DATE}</lastmod>
          <priority>0.65</priority>
      </url>`
        )
        .join("")}

      ${category.pages
        .map(
          ({ params: { category, page } }) => `
      <url>
          <loc>${process.env.NEXT_BASE_URL}${ROUTE_URL.CATEGORY}/${category}/page/${page}</loc>
          <lastmod>${CURRENT_ISO_DATE}</lastmod>
          <priority>0.45</priority>
      </url>`
        )
        .join("")}    
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
