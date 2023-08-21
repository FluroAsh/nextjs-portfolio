import Link from "next/link"
import { ROUTE_URL } from "constants/paths"

type PageType = "blog" | "category"
type PaginationProps = {
  currentPage: number
  totalPages: number
  type: PageType
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  type,
}) => {
  const PAGE_PATH = {
    blog: `${ROUTE_URL.BLOG}${ROUTE_URL.PAGE}`,
    category: `${ROUTE_URL.CATEGORY}${ROUTE_URL.PAGE}`,
  } as const

  const pages = Array(totalPages).fill(0)

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex gap-3 p-1 rounded-xl min-w-[150px] justify-between border-2 border-slate-400">
        <Navigation
          href={`${ROUTE_URL.BLOG}${ROUTE_URL.PAGE}/${currentPage - 1}`}
          text="prev"
          condition={currentPage > 1}
        />
        {pages.map((_, index) => {
          const page = index + 1
          const isCurrentPage = page === currentPage
          const isLastPage = page === totalPages
          const isFirstPage = page === 1
          const isWithinRange =
            page === currentPage ||
            (page === currentPage - 1 && !isFirstPage) ||
            (page === currentPage + 1 && !isLastPage)

          return isWithinRange ? (
            <Link
              key={page}
              href={`${PAGE_PATH[type]}/${page}`}
              className={`p-2 transition-colors duration-300 rounded-lg min-w-[35px] text-center ${
                isCurrentPage
                  ? "bg-sky-600 text-neutral-300"
                  : "hover:text-neutral-300 hover:bg-slate-500/50"
              }`}
            >
              {page}
            </Link>
          ) : null
        })}
        <Navigation
          href={`${PAGE_PATH[type]}/${currentPage + 1}`}
          text="next"
          condition={currentPage < totalPages}
        />
      </div>
    </div>
  )
}

const Navigation = ({
  href,
  text,
  condition,
}: {
  href: string
  text: string
  condition: boolean
}) =>
  condition ? (
    <Link
      href={href}
      className="p-2 capitalize transition-colors duration-300 rounded-lg hover:text-neutral-300 hover:bg-slate-500/50"
    >
      {text}
    </Link>
  ) : (
    <span className="p-2 text-gray-400 capitalize pointer-events-none">
      {text}
    </span>
  )
