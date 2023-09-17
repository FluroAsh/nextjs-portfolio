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

        {/* TODO: This section will need to render a different component or have a different layout below the lg breakpoint (1024px) */}
        <section id="projects" className="max-w-screen-xl px-5 mx-auto mt-10 ">
          <SectionTitle
            heading="Recent Projects"
            subheading="Cool stuff I've completed and am currently working on! 👷‍♂️"
          />
          {/* On mouseenter & mouseleave play an MP4 video demo */}
          <div className="grid grid-cols-12 grid-rows-2 h-[450px] w-100 bg-neutral-50 rounded-lg shadow-lg overflow-hidden">
            <div className="col-span-6 row-span-2 bg-red-500 grid-item">
              Featured
            </div>
            <div className="col-span-3 bg-orange-500">1</div>
            <div className="col-span-3 bg-yellow-500">2</div>
            <div className="col-span-3 bg-sky-500">3</div>
            <div className="col-span-3 bg-purple-500">4</div>
          </div>
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
