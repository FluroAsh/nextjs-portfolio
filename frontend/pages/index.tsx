// import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GET_POST } from './api'

export default function Home(/*{ posts }: IPostProps*/) {
  // TEMP: DEBUGGING BELOW
  // async function getData() {
  //   const { posts } = await GET_POST('another-test')
  //   // console.log(data.posts[0].attributes.slug)
  //   posts.data.map(({ attributes: { title, slug } }: any) =>
  //     console.log({ title, slug })
  //   )
  //   return { ...posts.data[0].attributes }
  // }

  // useEffect(() => {
  //   ;(async () => console.log(await getData()))()
  // }, [])
  return (
    <>
      {/* TODO: Next doesn't like this in the index file */}
      {/* Create a layout to wrap components? */}
      {/* <Head>
        <title key="home">Ashleys site</title>
      </Head> */}

      <section id="about-info" className="max-w-screen-lg p-3 mx-auto">
        <h1 className="text-2xl dark:text-white">Test</h1>

        {/* <ul className="dark:text-white">
          {posts.map(({ slug, title }) => {
            return (
              <li>
                <Link href={`/posts/${slug}`}>{title}</Link>
              </li>
            )
          })}
        </ul> */}

        <div className="mt-3">
          <p className="dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero. Penatibus et magnis dis parturient
            montes nascetur ridiculus. Lorem donec massa sapien faucibus et
            molestie. Odio eu feugiat pretium nibh ipsum consequat nisl vel
            pretium. Vitae sapien pellentesque habitant morbi tristique
            senectus.
          </p>
        </div>
      </section>
    </>
  )
}

// // Get slugs for links
// export async function getStaticProps({ preview = null }) {
//   const {
//     data: { posts }
//   } = useQuery(POST_SLUGS)

//   console.log(posts)

//   return {
//     props: { posts }
//   }
// }
