import { HeroBanner } from "components/HeroBanner"
import Layout from "components/layout"

const Home: React.FC = () => {
  return (
    <div>
      <Layout type="basic">
        <HeroBanner />

        <div className="px-5">
          <section id="about-info" className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl ">Placeholder</h1>

            <div className="mt-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pulvinar mattis nunc sed blandit libero. Penatibus et magnis dis
                parturient montes nascetur ridiculus. Lorem donec massa sapien
                faucibus et molestie. Odio eu feugiat pretium nibh ipsum
                consequat nisl vel pretium. Vitae sapien pellentesque habitant
                morbi tristique senectus. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit.
              </p>
              <p className="mt-3">
                Possimus, nemo sint sunt, odio optio placeat praesentium
                molestiae tempore eligendi laudantium et veniam at est ullam
                porro nisi tempora nam rerum. Consequuntur molestiae voluptates
                debitis, dolorem expedita repudiandae nemo hic mollitia
                molestias. Aliquid, dolores? Inventore deleniti doloremque
                dolorem dolores dignissimos eius eum totam ab debitis a, officia
                qui nobis quae natus? Id quos architecto asperiores impedit fuga
                odio esse quae quibusdam magni ipsum non, aliquid perferendis
                sapiente, quod a explicabo doloremque quidem consequuntur
                similique magnam incidunt dolorum voluptatibus minima. Cum, nam!
              </p>
            </div>
          </section>

          <section id="about-me" className="max-w-screen-xl mx-auto mt-5">
            <h1 className="text-2xl ">About Me</h1>
          </section>

          <section id="skills" className="max-w-screen-xl mx-auto mt-5">
            <h1 className="text-2xl ">Skills</h1>
            {/* Skils scrolling section */}
          </section>

          <section id="projects" className="max-w-screen-xl mx-auto mt-5">
            <h1 className="text-2xl ">Projects</h1>
          </section>

          <section id="blog-posts" className="max-w-screen-xl mx-auto mt-5">
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
        </div>
      </Layout>
    </div>
  )
}

export default Home
