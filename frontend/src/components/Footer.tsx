import React, { forwardRef } from "react"

export const Footer = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref}>
      <footer className="flex justify-center border-t border-orange-300 bg-orange-300/50 dark:bg-sky-700 dark:border-sky-900">
        <div className="w-screen max-w-screen-xl p-3 text-center ">
          Footer Placeholder &gt; Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quas quae eaque laboriosam quam veritatis similique
          optio? Magnam omnis asperiores, velit excepturi incidunt cum fugiat
          adipisci nam recusandae ea accusamus corrupti!
        </div>
      </footer>
    </div>
  )
})
