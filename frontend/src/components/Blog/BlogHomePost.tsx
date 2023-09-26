import clsx from "clsx"

import { PostData } from "types/api-types"

import BlogPreview from "./BlogPreview"

export const BlogPostsHome = ({ posts }: { posts: PostData[] }) => {
  return (
    <div className="grid sm:grid-cols-6 sm:grid-rows-2 md:grid-rows-1 gap-4">
      {posts.map((post, idx) => (
        <div
          className={clsx(
            idx === 0 && "sm:col-span-6 md:col-span-2",
            idx === 1 && "sm:col-span-3 md:col-span-2",
            idx === 2 && "sm:col-span-3 md:col-span-2"
          )}
        >
          <BlogPreview
            key={post.id}
            attributes={post.attributes}
            categoryData={post.attributes.categories.data}
            type="tile"
          />
        </div>
      ))}
    </div>
  )
}
