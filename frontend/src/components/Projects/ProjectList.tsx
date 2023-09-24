import { Project } from "./Project"

const PROJECTS = [
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, repellendus pariatur quo provident vitae commodi vero eaque fugiat aperiam quibusdam, cumque tenetur nemo non explicabo. Temporibus assumenda vitae excepturi recusandae? Ratione beatae voluptatibus, temporibus maxime dolorum nemo corporis placeat nesciunt! Numquam alias, expedita at magnam perferendis distinctio, vero explicabo non blanditiis ducimus architecto iste similique tempora a, iure eligendi laborum?",
    labels: ["Ruby on Rails", "PostGreSQL", "Express"],
    imgSrc: "https://via.placeholder.com/500x500",
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, repellendus pariatur quo provident vitae commodi vero eaque fugiat aperiam quibusdam, cumque tenetur nemo non explicabo. Temporibus assumenda vitae excepturi recusandae? Ratione beatae voluptatibus, temporibus maxime dolorum nemo corporis placeat nesciunt! Numquam alias, expedita at magnam perferendis distinctio, vero explicabo non blanditiis ducimus architecto iste similique tempora a, iure eligendi laborum?",
    labels: ["React", "NextJS", "GraphQL"],
    imgSrc: "https://via.placeholder.com/500x500",
  },
  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, repellendus pariatur quo provident vitae commodi vero eaque fugiat aperiam quibusdam, cumque tenetur nemo non explicabo. Temporibus assumenda vitae excepturi recusandae? Ratione beatae voluptatibus, temporibus maxime dolorum nemo corporis placeat nesciunt! Numquam alias, expedita at magnam perferendis distinctio, vero explicabo non blanditiis ducimus architecto iste similique tempora a, iure eligendi laborum?",
    labels: ["React", "NextJS", "GraphQL"],
    imgSrc: "https://via.placeholder.com/500x500",
  },
]

export const ProjectList = () => (
  <div className="flex flex-col gap-5">
    {PROJECTS.map(({ imgSrc, title, description, labels }, idx) => (
      <Project
        key={`project-${idx}`}
        title={title}
        description={description}
        labels={labels}
        imgSrc={imgSrc}
        idx={idx}
      />
    ))}
  </div>
)
