import React from 'react'
import Link from 'next/link'

import { ERROR_MAP } from 'constants/errors'
import { Layout } from 'components/layout'

import { NextApiResponse } from 'next'

export function Error({ statusCode }: { statusCode: number }) {
  return (
    <Layout pageType="basic">
      <div className="flex items-center justify-center dark:text-white h-[calc(100vh-57px)] ">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-100 dark:bg-slate-500/50 backdrop-blur border-slate-500/50">
          {/* TODO: Replace with an SVG/Img */}
          <span className="mb-4 text-5xl">⚠️</span>
          <div className="flex items-center content-center text-lg">
            <span className="flex items-center mr-2 after:border-r-2 after:ml-2 after:border-slate-400 after:h-8 after:inline-block">
              Error {statusCode} &mdash; {ERROR_MAP[statusCode]}
            </span>
            <Link
              className="transition-colors duration-300 dark:text-slate-300 hover:text-sky-500"
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
  err
}: {
  res: NextApiResponse
  err: NextApiResponse
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
