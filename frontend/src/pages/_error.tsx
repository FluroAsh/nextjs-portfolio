import { NextApiResponse } from "next"
import Link from "next/link"
import { ERROR_MAP } from "constants/errors"
import Layout from "Layouts/layout"

export function Error({ statusCode }: { statusCode: number }) {
  const errorMessage = ERROR_MAP[statusCode]

  return (
    <Layout title="ashleygthompson | Error!">
      <div className="flex items-center justify-center dark:text-white -h-navbar">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-100 dark:to-slate-500/50 dark:from-slate-400/50 backdrop-blur border-slate-500/50 bg-gradient-to-t to-neutral-400/80 from-neutral-500/80">
          {/* TODO: Replace with an SVG/Img */}
          <span className="mb-4 text-5xl">⚠️</span>
          <div className="flex items-center content-center text-lg">
            <span className="flex items-center mr-2 text-neutral-100 after:border-r-2 after:ml-2 dark:after:border-slate-400 after:border-slate-500/50 after:h-8 after:inline-block">
              Error {statusCode} &mdash; {errorMessage}
            </span>
            <Link
              className="transition-colors duration-300 text-neutral-100 hover:text-sky-600"
              href="/"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextApiResponse
  err: NextApiResponse
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
