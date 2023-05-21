import React from 'react'
import Link from 'next/link'

import Layout from 'components/layout'
import { ERROR_MAP } from 'constants/errors'

function FourZeroFour() {
  return (
    <Layout pageType="basic">
      <div className="flex items-center justify-center dark:text-white h-100vh-minus-navbar">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-100 dark:bg-slate-500/50 backdrop-blur border-slate-500/50">
          {/* TODO: Replace with an SVG/Img */}
          <span className="mb-4 text-5xl">⚠️</span>
          <div className="flex items-center content-center text-lg">
            <span className="flex items-center mr-2 after:border-r-2 after:ml-2 after:border-slate-400 after:h-8 after:inline-block">
              Error 404 &mdash; {ERROR_MAP[400]}
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

export default FourZeroFour
