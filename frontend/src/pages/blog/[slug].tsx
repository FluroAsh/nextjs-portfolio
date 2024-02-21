import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { faArrowLeftLong } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "Layouts/layout"
import readingTime from "reading-time"

import type { BlogPostProps, MetaTagAttributes } from "types/blog-types"
import { BlogImage } from "components/Blog"
import { TimeDate } from "components/TimeDate"

import { fetchPost } from "lib/gql/postQueries"
import { markdownToHtml } from "lib/markdownToHtml"

import "highlight.js/styles/base16/monokai.css"

import { ROUTE_URL } from "constants/paths"

import Button from "components/Button"
import { TableOfContents } from "components/TableOfContents"

import { generatePaths } from "lib/path-generator"
import { cn, truncate } from "lib/utils"

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  markdownContent,
  htmlContent,
  createdAt,
  description,
  alternativeText,
  formats,
  metaTags,
}) => {
  const stats = readingTime(markdownContent) // HTML Content inflates the reading time as it has more characters

  return (
    <Layout
      title={`ashleygthompson | ${title}`}
      metaDescription={description}
      metaTags={metaTags}
    >
      <div className="max-w-screen-lg mx-auto px-5">
        <header>
          <div className="py-5 border-b border-neutral-600 dark:border-slate-500">
            <Button
              type="back"
              href={ROUTE_URL.BLOG}
              className={cn(
                "transition-colors text-neutral-500 group hover:text-neutral-400",
                "dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                size="sm"
                className="group-hover:animate-back-and-forth"
              />
              <span className="ml-2 font-semibold tracking-wide">
                Back to Blog
              </span>
            </Button>
            {/* REVIEW: Should refactor this h1 to use BlogTitle... */}
            <h1 className="text-3xl font-bold tracking-wide sm:text-4xl text-neutral-700 dark:text-white text-balance">
              {title}
            </h1>
            <TimeDate
              className="pt-1"
              createdAt={createdAt}
              minutes={stats.minutes}
              type="post"
            />
          </div>

          <div className="pt-4">
            <BlogImage alt={alternativeText} formats={formats} />
          </div>
        </header>

        <div className="flex justify-between">
          <article
            className="py-5 lg:pl-5 prose dark:prose-invert dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <TableOfContents />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await generatePaths.BLOG.slugs(),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params ?? {}
  const post = await fetchPost(slug)
  if (!post) return { notFound: true }

  const {
    title,
    content: markdownContent,
    cover,
    createdAt,
    description,
  } = post
  const htmlContent = await markdownToHtml(markdownContent)

  const metaTags: MetaTagAttributes = {
    "og:title": title,
    "og:description": truncate(description, 150),
    "og:image": cover.data.attributes.formats.large.url,
    "og:url": `${process.env.NEXT_BASE_URL}${ROUTE_URL.BLOG}/${slug as string}`,
    "og:type": "article",
  }

  return {
    props: {
      title,
      markdownContent,
      htmlContent,
      createdAt,
      description,
      alternativeText: cover?.data?.attributes?.alternativeText,
      formats: cover?.data?.attributes?.formats,
      metaTags,
    },
  }
}

export default BlogPost
