import Layout from "./layout"

const defaultHeroTitle = "Latest Posts"
const defaultHeroDescrition =
  "The latest collection of my little musings & articles to help you become a better developer."

export const PostLayout: React.FC<{
  children: React.ReactNode
  title: string
  heroTitle?: string
  heroDescription?: string
  metaDescription?: string
}> = ({ children, title, heroTitle, heroDescription, metaDescription }) => {
  return (
    <Layout type="blog" title={title} metaDescription={metaDescription}>
      <div className="w-full max-w-screen-lg px-5 mx-auto">
        <header className="py-4 border-b dark:border-slate-500 border-neutral-600">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
            {heroTitle ?? defaultHeroTitle}
          </h1>
          <span className=" dark:text-slate-300 text-neutral-600">
            {heroDescription ?? defaultHeroDescrition}
          </span>
        </header>
        {children}
      </div>
    </Layout>
  )
}
