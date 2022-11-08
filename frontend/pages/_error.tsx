import React from 'react'
import Link from 'next/link'

export interface IErrorMap {
  [code: string]: string
}

export const ERROR_MAP: IErrorMap = {
  404: 'Unexpected Error',
  500: 'Please try again later'
}

function Error({ statusCode }: { statusCode: number }) {
  return (
    <div className="flex items-center justify-center dark:text-white h-[calc(100vh-57px)] ">
      <div className="flex flex-col items-center justify-center w-100 ">
        {/* TODO: Replace with an SVG/Img */}
        <span className="mb-4 text-5xl">⚠️</span>
        <div className="flex items-center content-center text-lg">
          <span className="flex items-center mr-2 after:border-r-2 after:ml-2 after:border-slate-400 after:h-8 after:inline-block">
            Error {statusCode} &mdash; {ERROR_MAP[statusCode]}
          </span>
          <Link
            className="transition-colors duration-300 dark:text-slate-400 hover:text-sky-500"
            href="/"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// TODO: Search for types, to silence below warning
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
