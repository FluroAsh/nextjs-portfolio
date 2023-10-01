import { useState } from "react"
import clsx from "clsx"
import readingTime from "reading-time"

import { PostData } from "types/api-types"
import { TimeDate } from "components/TimeDate"

import BlogPreview from "./BlogPreview"

const cardLayout = [
  "md:col-span-6 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
]

export const BlogPostsHome = ({ posts }: { posts: PostData[] }) => {
  const [hoverIndex, setHoverIdx] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleHover = (idx: number, hovering: boolean) => {
    setHoverIdx(idx)
    setIsHovering(hovering)
  }

  return (
    <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 lg:grid-rows-1">
      {posts.map((post, idx) => {
        const stats = readingTime(post.attributes.content)
        return (
          <div
            key={post.id}
            className={clsx(
              "relative overflow-hidden rounded-lg group:test shadow-lg",
              "hover:ring-4 hover:ring-offset-2 dark:hover:ring-sky-500 transition-shadow dark:hover:ring-offset-dark-background-primary",
              cardLayout[idx]
            )}
            onMouseEnter={() => handleHover(idx, true)}
            onMouseOut={() => handleHover(idx, false)}
            tabIndex={0}
          >
            <BlogPreview
              className={clsx(
                "transition duration-300 ",
                isHovering && hoverIndex !== idx && "grayscale"
              )}
              attributes={post.attributes}
              categoryData={post.attributes.categories.data}
              type="tile"
            />
            <div
              className={clsx(
                "absolute bottom-0 left-0 w-full p-4 pointer-events-none",
                "bg-gradient-to-t from-slate-800/80 via-slate-700/80 to-transparent"
              )}
            >
              <h1 className="text-2xl font-bold tracking-wide truncate">
                {post.attributes.title}
              </h1>
              <TimeDate
                createdAt={post.attributes.createdAt}
                type="stacked"
                minutes={stats.minutes}
                textType="singular"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
