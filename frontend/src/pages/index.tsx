import type { GetStaticProps } from "next"
import Layout from "Layouts/layout"

import type { PostData, QueryPosts } from "types/api-types"
import BlogPreviewHome from "components/Blog/BlogPreviewHome"
import { HeroBanner } from "components/HeroBanner"
import { InfoCards } from "components/InfoCards"
import { ProjectList } from "components/Projects/ProjectList"
import { ScrollingSkills } from "components/ScrollingSkills"

import { initializeApollo } from "lib/apollo-client"
import { GET_HOMEPAGE_POSTS } from "lib/gql/postQueries"

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

const Home: React.FC<{ posts: PostData[] }> = ({ posts }) => (
  <div>
    <Layout type="basic" title="ashleygthompson | Home ">
      <HeroBanner />

      <section id="about-me" className="max-w-screen-xl px-5 mx-auto mt-5">
        <SectionTitle
          heading={
            <>
              Who <span className="italic text-sky-500">IS</span> this guy
              anyway?
            </>
          }
          subheading="Let's get to know me better, starting with some #quickFacts..."
        />

        <InfoCards />
      </section>

      {/* TODO: Probably want an intersection observer to stop the animation
          When a user scrolls past this component */}
      <section id="skills" className="max-w-screen-xl mx-auto mt-10">
        <SectionTitle
          heading="What's in my toolbox?"
          subheading="A quick look into some of the tools I use to build cool stuff! 🧰"
        />
        <ScrollingSkills />
      </section>

      <section id="projects" className="max-w-screen-xl px-5 mx-auto mt-10 ">
        <SectionTitle
          heading="Recent Projects"
          subheading="Cool stuff I've completed or am currently working on! 👷‍♂️"
        />
        <ProjectList />
      </section>

      <section id="blog-posts" className="max-w-screen-xl px-5 mx-auto mt-10 ">
        <SectionTitle
          heading="Fresh Off The Press!"
          subheading="If you like reading and tech, you'll love these! 📚"
        />
        <BlogPreviewHome posts={posts} />
      </section>
    </Layout>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { posts },
  } = await apolloClient.query<QueryPosts>({
    query: GET_HOMEPAGE_POSTS,
    variables: { limit: 3 },
  })

  return {
    props: {
      posts: posts.data,
    },
  }
}

export default Home
