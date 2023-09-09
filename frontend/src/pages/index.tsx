import Head from "next/head"
import Layout from "Layouts/layout"

import { HeroBanner } from "components/HeroBanner"
import { InfoCards } from "components/InfoCards"
import { ScrollingSkills } from "components/ScrollingSkills"

const SectionTitle = ({
  heading,
  subheading,
}: {
  heading: React.ReactNode
  subheading: React.ReactNode
}) => (
  <div className="mb-2">
    <h1 className="px-5 text-3xl text-center">{heading}</h1>
    <h3 className="text-xl text-center text-neutral-300 ">{subheading}</h3>
  </div>
)

const Home: React.FC = () => {
  return (
    <div>
      <Layout type="basic" title="Home Page ">
        <HeroBanner />

        <section id="about-me" className="max-w-screen-xl px-5 mx-auto mt-5">
          <SectionTitle
            heading={
              <>
                Who <span className="italic">IS</span> this guy anyway?
              </>
            }
            subheading="Well here's a little something about me..."
          />

          <InfoCards />
        </section>

        {/* TODO: Probably want an intersection observer to stop the animation
          When a user scrolls past this component */}
        <section id="skills" className="max-w-screen-xl mx-auto mt-5">
          <SectionTitle
            heading="Skills"
            subheading=" A few of them anyway... 😉"
          />
          <ScrollingSkills />
        </section>

        <section id="projects" className="max-w-screen-xl px-5 mx-auto mt-5">
          <SectionTitle
            heading="Recent Projects"
            subheading="Cool stuff I've completed and am currently working on! 👷‍♂️"
          />
        </section>

        <section id="blog-posts" className="max-w-screen-xl px-5 mx-auto mt-5">
          <SectionTitle
            heading="Blog Posts"
            subheading="If you like reading and tech, you'll love these! 📚"
          />
          {/* TODO: List thumbnails/Basic info of Blog Posts here */}
          <div className="h-80 w-100 bg-neutral-50"></div>
          {/* <ul>
            {posts.map(({ slug, title }) => {
              return (
                <li>
                <Link href={`/posts/${slug}` }>{title}</Link>
                </li>
                )
              })}
            </ul> */}
        </section>
      </Layout>
    </div>
  )
}

export default Home
