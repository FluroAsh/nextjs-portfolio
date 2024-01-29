import { useState } from "react"
import readingTime from "reading-time"

import { PostData } from "types/api-types"
import { TimeDate } from "components/TimeDate"

import { cn } from "lib/utils"

import BlogPreview from "./BlogPreview"

const postColSpan = (postsLength: number, idx: number) => {
  if (postsLength === 3 && idx !== 0) return "md:col-span-3 lg:col-span-2"
  else return "md:col-span-6 lg:col-span-2"
}

const gridRows = [
  "grid-rows-1 md:grid-rows-1 lg:grid-rows-1",
  "grid-rows-2 md:grid-rows-2 lg:grid-rows-1",
  "grid-rows-3 md:grid-rows-2 lg:grid-rows-1",
]

const BlogPreviewHome = ({ posts }: { posts: PostData[] }) => {
  const [hoverIndex, setHoverIdx] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleHover = (idx: number, hovering: boolean) => {
    setHoverIdx(idx)
    setIsHovering(hovering)
  }

  return (
    <div className={cn(gridRows[posts.length - 1], "grid gap-4 grid-flow-col")}>
      {posts.map((post, idx) => {
        const stats = readingTime(post.attributes.content)
        return (
          <div
            key={post.id}
            className={cn(
              "relative overflow-hidden rounded-lg shadow-lg",
              "hover:ring-4 hover:ring-offset-4 hover:ring-neutral-700 hover:ring-offset-neutral-100 transition-shadow",
              "hover:ring-sky-500 dark:hover:ring-offset-dark-background-primary",
              postColSpan(posts.length, idx)
            )}
            onMouseEnter={() => handleHover(idx, true)}
            onMouseOut={() => handleHover(idx, false)}
            tabIndex={0}
          >
            <BlogPreview
              className={cn(
                "transition duration-300 ",
                isHovering && hoverIndex !== idx && "grayscale"
              )}
              attributes={post.attributes}
              categoryData={post.attributes.categories.data}
              type="tile"
            />
            <div
              className={cn(
                "absolute bottom-0 left-0 w-full p-4 pointer-events-none",
                "bg-gradient-to-t from-neutral-600 to-transparent",
                "dark:from-slate-700/80"
              )}
            >
              <h1 className="text-2xl font-bold tracking-wide truncate text-neutral-100 dark:text-white">
                {post.attributes.title}
              </h1>
              <TimeDate
                createdAt={post.attributes.createdAt}
                type="home"
                minutes={stats.minutes}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlogPreviewHome
