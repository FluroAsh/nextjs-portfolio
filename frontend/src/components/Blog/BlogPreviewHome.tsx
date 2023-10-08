import { useState } from "react"
import readingTime from "reading-time"

import { PostData } from "types/api-types"
import { TimeDate } from "components/TimeDate"

import { cn } from "lib/utils"

import BlogPreview from "./BlogPreview"

const cardLayout = [
  "md:col-span-6 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
]

export const BlogPreviewHome = ({ posts }: { posts: PostData[] }) => {
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
            className={cn(
              "relative overflow-hidden rounded-lg group:test shadow-lg",
              "hover:ring-4 hover:ring-offset-4 hover:ring-neutral-700 hover:ring-offset-neutral-100  transition-shadow ",
              "hover:ring-sky-500 dark:hover:ring-offset-dark-background-primary",
              cardLayout[idx]
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
                "dark:from-slate-800/80 dark:via-slate-700/80"
              )}
            >
              <h1 className="text-2xl font-bold tracking-wide truncate text-neutral-100 dark:text-white">
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