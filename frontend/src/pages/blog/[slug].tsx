import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { faArrowLeftLong } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DAILY_REVALIDATION } from "constants/api"
import Layout from "Layouts/layout"
import readingTime from "reading-time"

import type { BlogPostProps } from "types/blog-types"
import { BlogImage } from "components/Blog"
import { TimeDate } from "components/TimeDate"

import { initializeApollo } from "lib/apollo-client"
import { GET_POST, GET_POST_SLUGS } from "lib/gql/postQueries"
import { markdownToHtml } from "lib/markdownToHtml"

import "highlight.js/styles/base16/monokai.css"

import { ROUTE_URL } from "constants/paths"

import type { QueryPosts, QuerySlugs } from "types/api-types"
import Button from "components/Button"

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  description,
  content,
  createdAt,
  alternativeText,
  formats,
}) => {
  const stats = readingTime(content)

  return (
    <Layout
      type="blog"
      title={`ashleygthompson | ${title}`}
      metaDescription={description}
    >
      <div className="w-full max-w-screen-lg">
        <header className="w-full px-5">
          <div className="py-5 border-b border-neutral-600 dark:border-slate-500">
            <Button
              type="back"
              href={ROUTE_URL.BLOG}
              className="transition-colors text-neutral-600 group hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white"
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                size="sm"
                className="group-hover:animate-back-and-forth"
              />
              <span className="ml-2">Back to Blog</span>
            </Button>
            {/* REVIEW: Should refactor this h1 to use BlogTitle... */}
            <h1 className="text-3xl font-bold tracking-wide sm:text-4xl text-neutral-800 dark:text-white">
              {title}
            </h1>
            <TimeDate
              createdAt={createdAt}
              minutes={stats.minutes}
              type="post"
            />
          </div>

          <div className="pt-4">
            <BlogImage alt={alternativeText} formats={formats} />
          </div>
        </header>

        <article
          className="max-w-full px-5 pt-5 prose dark:prose-invert dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts },
  } = await apolloClient.query<QuerySlugs>({ query: GET_POST_SLUGS })

  const paths = posts?.data?.map(({ attributes: { slug } }) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  const { slug } = params ?? {}

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_POST,
    variables: { slug },
  })

  const post = posts?.data?.[0]?.attributes
  if (!post) return { notFound: true }

  const {
    title,
    content: contentMarkdown,
    cover,
    createdAt,
    description,
  } = post
  const content = await markdownToHtml(contentMarkdown)

  return {
    props: {
      title,
      description,
      content,
      createdAt,
      alternativeText: cover?.data?.attributes?.alternativeText,
      formats: cover?.data?.attributes?.formats,
    },
    revalidate: DAILY_REVALIDATION,
  }
}

export default BlogPost
