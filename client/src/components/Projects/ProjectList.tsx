import type { ColorName } from "constants/styles"

import { Project } from "./Project"

export type ProjectAttributes = {
  title: string
  description: React.ReactNode
  labels: ColorName[]
  imgSrc: string
  githubLink: string
  deployedUrl?: string
}

type Projects = ProjectAttributes[]

const PROJECTS: Projects = [
  {
    title: "Charging Station Finder",
    description: (
      <>
        <p>
          iEV is an educational proof-of-concept application created by a
          passionate Frontend Developer along with his trusty team-mate,
          focusing on accelerating the adoption of electric vehicles (EVs).
          Designed primarily for educational purposes, this platform connects EV
          owners and their charging stations to explore the potential of
          sustainable commuting.
        </p>
        <p className="pt-2">
          Users can experiment with both hosting and booking charging stations,
          gaining insights into the possibilities of creating a cohesive network
          of privately owned charging spots. While initially serving as an
          educational project, iEV&apos;s design emphasizes scalability and
          hints at upcoming features such as user reviews and profiles.
        </p>
      </>
    ),
    labels: ["ExpressJS", "PostgreSQL", "SCSS"],
    imgSrc: "images/projects/iev-1x.webp",
    githubLink: "https://github.com/FluroAsh/iev-client",
  },
  {
    title: "Pokémon Marketplace",
    description: (
      <>
        <p>
          Pokéhub is a passion project and educational endeavor, designed to
          explore the world of Rails while bringing Pokémon trading card
          enthusiasts together. This platform serves as a proof of concept,
          offering a visually engaging space for card enthusiasts to exchange
          their beloved Pokémon cards. While not a final product and likely to
          evolve in the future, Pokéhub is a place to learn, experiment, and
          dive into the Rails framework.
        </p>
        <p className="pt-2">
          Setting it up is straightforward, with guidance on installing
          dependencies, configuring Stripe functionality, and using Amazon S3
          storage. Join us in this educational journey, where we merge the
          excitement of collecting Pokémon cards with the exploration of web
          development, making it an engaging experience for learners and
          enthusiasts alike.
        </p>
      </>
    ),
    labels: ["ROR", "Bootstrap", "PostgreSQL"],
    imgSrc: "images/projects/pokehub-1x.webp",
    githubLink: "https://github.com/FluroAsh/pokemon-marketplace",
  },
  {
    title: "Ash's Blog & Portfolio",
    description: (
      <>
        <p>
          Coincidentally, this is where you&apos;re viewing this from{" "}
          <span className="underline">right now!</span> Ashley&apos;s Portfolio
          Website is a showcase of innovation, blending industry-relevant
          technologies such as NextJS and GraphQL in order to construct his own
          personal Digital Garden. Created by a passionate Frontend Developer,
          this platform is more than just a portfolio; it&apos;s an exploration
          of best practices and a place to have a bit of fun.
        </p>
        <p className="pt-2">
          The technology stack includes Strapi as a Headless CMS integrated with
          GraphQL and AWS S3 Plugin, NextJS for building fast web applications,
          NodeJS for asynchronous event-driven JavaScript runtime, Apollo for
          comprehensive state management with GraphQL, TailwindCSS for efficient
          styling, and TypeScript for enhanced type safety.
        </p>
      </>
    ),
    labels: ["TypeScript", "NextJS", "TailwindCSS"],
    imgSrc: "images/projects/blog-portfolio-1x.webp",
    githubLink: "https://github.com/FluroAsh/nextjs-portfolio",
  },
]

export const ProjectList = () => (
  <div className="flex flex-col gap-5">
    {PROJECTS.map(
      (
        { imgSrc, title, description, labels, githubLink, deployedUrl },
        idx
      ) => (
        <Project
          key={`project-${idx}`}
          title={title}
          description={description}
          labels={labels}
          imgSrc={imgSrc}
          githubLink={githubLink}
          deployedUrl={deployedUrl}
          idx={idx}
        />
      )
    )}
  </div>
)
