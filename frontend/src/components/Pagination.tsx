import Link from "next/link"
import { ROUTE_URL } from "constants/paths"

type PageType = "blog" | "category"
type BlogType = { type: "blog"; slug?: never }
type CategoryType = { type: "category"; slug: string }

type PaginationProps<T extends PageType> = {
  currentPage: number
  totalPages: number
  type: T // passed in as a prop ("blog" | "category" | anything else)
  slug?: string
} & (T extends "blog" ? BlogType : CategoryType)

const Navigation = ({
  href,
  text,
  isEnabled,
}: {
  href: string
  text: string
  isEnabled: boolean
}) =>
  isEnabled ? (
    <Link
      href={href}
      className="p-2 capitalize transition-colors duration-300 rounded-lg hover:bg-neutral-600/70 hover:text-neutral-200 dark:hover:bg-slate-500/50 tracking-wide"
    >
      {text}
    </Link>
  ) : (
    <span className="p-2 capitalize pointer-events-none text-neutral-600/80 dark:text-neutral-400 tracking-wide">
      {text}
    </span>
  )

export const Pagination: React.FC<PaginationProps<PageType>> = ({
  currentPage,
  totalPages,
  type,
  slug,
}) => {
  const PAGE_PATH = {
    blog: `${ROUTE_URL.BLOG}${ROUTE_URL.PAGE}`,
    category: `${ROUTE_URL.CATEGORY}/${slug}${ROUTE_URL.PAGE}`,
  } as const

  const pages = Array.from({ length: totalPages }, (_, idx) => ++idx)

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex gap-2 p-1 rounded-xl min-w-[150px] justify-between border-2 border-neutral-600 dark:border-slate-400">
        <Navigation
          href={`${PAGE_PATH[type]}/${currentPage - 1}`}
          text="prev"
          isEnabled={currentPage > 1}
        />
        <div className="flex gap-1">
          {pages.map((page) => {
            const isCurrentPage = page === currentPage

            return isCurrentPage ? (
              <span
                key={page}
                className="py-2 px-0 transition-colors duration-300 rounded-lg min-w-[35px] text-center pointer-events-none bg-sky-600 text-neutral-100 dark:text-neutral-300"
              >
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href={`${PAGE_PATH[type]}/${page}`}
                className="py-2 px-0 transition-colors duration-300 rounded-lg min-w-[35px] text-center hover:bg-neutral-600/70 hover:text-neutral-200 dark:hover:bg-slate-500/50"
              >
                {page}
              </Link>
            )
          })}
        </div>

        <Navigation
          href={`${PAGE_PATH[type]}/${currentPage + 1}`}
          text="next"
          isEnabled={currentPage < totalPages}
        />
      </div>
    </div>
  )
}
