// import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Layout } from 'components/layout'

export default function Home() {
  return (
    <Layout pageType="home">
      <section id="about-info" className="max-w-screen-lg p-3 mx-auto">
        <h1 className="text-2xl">Test</h1>

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

        <div className="mt-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero. Penatibus et magnis dis parturient
            montes nascetur ridiculus. Lorem donec massa sapien faucibus et
            molestie. Odio eu feugiat pretium nibh ipsum consequat nisl vel
            pretium. Vitae sapien pellentesque habitant morbi tristique
            senectus. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <p className="mt-3">
            Possimus, nemo sint sunt, odio optio placeat praesentium molestiae
            tempore eligendi laudantium et veniam at est ullam porro nisi
            tempora nam rerum. Consequuntur molestiae voluptates debitis,
            dolorem expedita repudiandae nemo hic mollitia molestias. Aliquid,
            dolores? Inventore deleniti doloremque dolorem dolores dignissimos
            eius eum totam ab debitis a, officia qui nobis quae natus? Id quos
            architecto asperiores impedit fuga odio esse quae quibusdam magni
            ipsum non, aliquid perferendis sapiente, quod a explicabo doloremque
            quidem consequuntur similique magnam incidunt dolorum voluptatibus
            minima. Cum, nam!
          </p>
          <p className="mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            quisquam fugit quam itaque eligendi blanditiis obcaecati minima
            similique laborum voluptatem corrupti doloribus veritatis porro
            odio, rerum sapiente iure commodi temporibus. Commodi porro
            recusandae placeat ullam quia non itaque, molestias nulla
            perferendis cumque suscipit repellat voluptate magni. Sapiente,
            quia. Harum provident doloribus perferendis facilis! Atque vero
            totam aspernatur ad eveniet numquam. Officiis atque dicta soluta
            excepturi in est cumque quos explicabo possimus eos culpa officia,
            ducimus non voluptatibus iste maxime fugit, eaque illum perspiciatis
            error? Dolore repellendus sint officiis est impedit.
          </p>
          <p className="mt-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            molestiae, laborum aut tempora, autem dolore distinctio, itaque
            asperiores molestias accusamus totam. Vitae rerum dolor corrupti
            ducimus. Modi molestias obcaecati tenetur. Voluptates similique quam
            quibusdam nobis obcaecati placeat a voluptatem officiis quos eius,
            ullam dolorum dolore voluptatum consequatur minus temporibus error
            vitae neque minima. Fugiat cupiditate magnam natus reprehenderit
            architecto reiciendis! Quia eaque architecto consequuntur eveniet
            velit voluptatibus id, cum labore! Officiis omnis delectus, quos
            aliquid assumenda nostrum voluptas quibusdam vel asperiores tenetur,
            culpa quidem. Tempora quia nihil architecto nobis suscipit.
          </p>
        </div>
      </section>
    </Layout>
  )
}
