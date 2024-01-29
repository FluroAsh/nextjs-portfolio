import type { GetStaticProps } from "next"
import { MONTHLY_REVALIDATION } from "constants/api"
import Layout from "Layouts/layout"

import type { PostData } from "types/api-types"
import { MetaTagAttributes } from "types/blog-types"
import BlogPreviewHome from "components/Blog/BlogPreviewHome"
import { HeroBanner } from "components/HeroBanner"
import { InfoCards } from "components/InfoCards"
import { ProjectList } from "components/Projects/ProjectList"
import { ScrollingSkills } from "components/ScrollingSkills"

import { fetchHomePosts } from "lib/gql/postQueries"

const SectionTitle = ({
  heading,
  subheading,
}: {
  heading: React.ReactNode
  subheading: React.ReactNode
}) => (
  <div className="mb-3">
    <h2 className="px-5 text-3xl font-bold text-center text-neutral-700 dark:text-white">
      {heading}
    </h2>
    <h3 className="text-xl text-center text-neutral-600 dark:text-neutral-300 ">
      {subheading}
    </h3>
  </div>
)

const Home: React.FC<{ posts: PostData[]; metaTags: MetaTagAttributes }> = ({
  posts,
  metaTags,
}) => (
  <Layout
    title="ashleygthompson | Home"
    metaDescription="Ash's Developer Blog — If you're interested in everything React, CSS & TypeScript then stay a while, kick your feet up and explore! There's a bunch to learn 🍻"
    metaTags={metaTags}
  >
    <HeroBanner />

    <section id="about-me" className="w-full max-w-screen-xl px-5 mx-auto mt-5">
      <SectionTitle
        heading={
          <>
            Who <span className="italic text-sky-500">IS</span> this guy anyway?
          </>
        }
        subheading="Let's get to know me better, starting with some #quickFacts..."
      />

      <InfoCards />
    </section>

    {/* TODO: Probably want an intersection observer to stop the animation
          When a user scrolls past this component */}
    <section id="skills" className="w-full max-w-screen-xl mx-auto mt-10">
      <SectionTitle
        heading="What's in my toolbox?"
        subheading="A quick look into some of the tools I use to build cool stuff! 🧰"
      />
      <ScrollingSkills />
    </section>

    <section
      id="projects"
      className="w-full max-w-screen-xl px-5 mx-auto mt-10 "
    >
      <SectionTitle
        heading="Recent Projects"
        subheading="Cool stuff I've completed or am currently working on! 👷‍♂️"
      />
      <ProjectList />
    </section>

    <section
      id="blog-posts"
      className="w-full max-w-screen-xl px-5 mx-auto mt-10 "
    >
      <SectionTitle
        heading="Fresh Off The Press!"
        subheading="Explore the garden of knowledge and find your next favorite read! 📚"
      />
      <BlogPreviewHome posts={posts} />
    </section>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchHomePosts()

  const metaTags: MetaTagAttributes = {
    "og:title": "Ashs' little slice of developer paradise",
    "og:description":
      "Exploring Code, Technology, and the Web on my Journey to a full-stack developer.",
    "og:image":
      "https://at-strapi-blog.s3.ap-southeast-2.amazonaws.com/static-assets/og-image.png",
    "og:url": `${process.env.NEXT_BASE_URL}`,
    "og:type": "website",
  }

  return {
    props: {
      posts: posts.data,
      metaTags,
    },
    revalidate: MONTHLY_REVALIDATION,
  }
}

export default Home
