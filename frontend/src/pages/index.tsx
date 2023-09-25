import Layout from "Layouts/layout"

import { HeroBanner } from "components/HeroBanner"
import { InfoCards } from "components/InfoCards"
import { ProjectList } from "components/Projects/ProjectList"
import { ScrollingSkills } from "components/ScrollingSkills"

const SectionTitle = ({
  heading,
  subheading,
}: {
  heading: React.ReactNode
  subheading: React.ReactNode
}) => (
  <div className="mb-3">
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
                Who <span className="italic text-sky-500">IS</span> this guy
                anyway?
              </>
            }
            subheading="Let's get to know me better, starting with some trivia..."
          />

          <InfoCards />
        </section>

        {/* TODO: Probably want an intersection observer to stop the animation
          When a user scrolls past this component */}
        <section id="skills" className="max-w-screen-xl mx-auto mt-10">
          <SectionTitle
            heading="Skills"
            subheading=" A few of them atleast... 😉"
          />
          <ScrollingSkills />
        </section>

        <section id="projects" className="max-w-screen-xl px-5 mx-auto mt-10 ">
          <SectionTitle
            heading="Recent Projects"
            subheading="Cool stuff I've completed or am currently working on! 👷‍♂️"
          />
          {/* NOTE: On mouseenter & mouseleave play an MP4 video demo? 🤔 */}
          <ProjectList />
        </section>

        <section
          id="blog-posts"
          className="max-w-screen-xl px-5 mx-auto mt-10 "
        >
          <SectionTitle
            heading="Blog Posts"
            subheading="If you like reading and tech, you'll love these! 📚"
          />
          {/* TODO: List thumbnails/Basic info of Blog Posts here */}
          <div className="grid grid-cols-2 sm:grid-cols-6 grid-rows-6 sm:grid-rows-1 gap-3 h-[800px] sm:h-80 w-100">
            <div className="col-span-2 row-span-2 bg-red-300 sm:col-span-2 "></div>
            <div className="col-span-2 row-span-2 bg-purple-300 sm:col-span-2 "></div>
            <div className="col-span-2 row-span-2 bg-blue-300 sm:col-span-2 "></div>
          </div>
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
