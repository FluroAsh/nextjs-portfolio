export const Footer = () => {
  return (
    <footer className="flex flex-col items-center p-3 mt-5 border-t border-orange-300 bg-orange-300/50 dark:bg-sky-700 dark:border-sky-900">
      <div className="flex items-center justify-center">
        <div className="mr-5 text-xl">Ashley Thompson</div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center ">Twitter</div>
          <div className="flex items-center ">LinkedIn</div>
          <div className="flex items-center ">GitHub</div>
        </div>
      </div>
      <div className="mt-2 text-slate-300">All rights reserved © 2023</div>
    </footer>
  )
}
