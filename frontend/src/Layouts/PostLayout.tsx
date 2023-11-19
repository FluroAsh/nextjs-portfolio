import { MetaTagAttributes } from "types/blog-types"

import Layout from "./layout"

const defaultHeroTitle = "Latest Posts"
const defaultHeroDescription =
  "The latest collection of my little musings & articles to help you become a better developer."

export const PostLayout: React.FC<{
  children: React.ReactNode
  title: string
  heroTitle?: string
  heroDescription?: string
  metaDescription?: string
  metaTags?: MetaTagAttributes
}> = ({
  children,
  title,
  heroTitle,
  heroDescription,
  metaDescription,
  metaTags,
}) => {
  return (
    <Layout title={title} metaDescription={metaDescription} metaTags={metaTags}>
      <div className="w-full max-w-screen-lg px-5 mx-auto">
        <header className="py-4 border-b dark:border-slate-500 border-neutral-600">
          <h1 className="text-3xl font-bold text-neutral-700 dark:text-white">
            {heroTitle ?? defaultHeroTitle}
          </h1>
          <span className="text-neutral-600 dark:text-slate-300 font-bold tracking-wide">
            {heroDescription ?? defaultHeroDescription}
          </span>
        </header>
        {children}
      </div>
    </Layout>
  )
}
