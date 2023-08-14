import Link from "next/link"
import { ROUTE_URL } from "constants/paths"

type PaginationProps = { currentPage: number; totalPages: number }

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => (
  <div id="pagination" className="flex justify-center w-full mt-4">
    {currentPage > 1 && (
      <Link
        href={`${ROUTE_URL.BLOG}/${ROUTE_URL.PAGE}/${currentPage - 1}`}
        className="px-5 py-2 duration-200 border rounded-lg bg-slate-500 border-slate-400 hover:bg-slate-400/80 transition-color"
      >
        Prev
      </Link>
    )}
    {currentPage < totalPages && (
      <Link
        href={`${ROUTE_URL.BLOG}/${ROUTE_URL.PAGE}/${currentPage + 1}`}
        className="px-5 py-2 duration-200 border rounded-lg bg-slate-500 border-slate-400 hover:bg-slate-400/80 transition-color"
      >
        Next
      </Link>
    )}
  </div>
)
