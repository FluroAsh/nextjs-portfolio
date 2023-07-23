import Head from "next/head"
import Layout from "Layouts/layout"

import { HeroBanner } from "components/HeroBanner"
import { InfoCards } from "components/InfoCards"

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Layout type="basic">
        <HeroBanner />

        <section id="about-me" className="max-w-screen-xl px-5 mx-auto mt-5">
          <div className="mb-2">
            <h1 className="text-2xl text-center ">About Me</h1>
            <h3 className="text-center text-neutral-300">
              And why I&apos;m the greatest ever
            </h3>
          </div>
          <InfoCards />
        </section>

        {/* TODO: Skils scrolling section (extract to a component) */}
        <section id="skills" className="max-w-screen-xl mx-auto mt-5">
          <h1 className="px-5 text-2xl">Skills</h1>
          <div className="w-100 bg-slate-400 h-80"></div>
        </section>

        <section id="projects" className="max-w-screen-xl px-5 mx-auto mt-5">
          <h1 className="text-2xl ">Projects</h1>
        </section>

        <section id="blog-posts" className="max-w-screen-xl px-5 mx-auto mt-5">
          <h1 className="text-2xl ">Blog Posts</h1>
          {/* TODO: List thumbnails/Basic info of Blog Posts here */}
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
