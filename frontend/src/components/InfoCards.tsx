import * as icon from "../static/icons"

const iconStyles = "absolute top-5 left-5 fill-slate-300/25 w-[75px] h-[75px]"
const INFO_CARDS = [
  {
    heading: "Technology",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: <icon.Twitter className={iconStyles} />,
  },
  {
    heading: "Test 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: <icon.Twitter className={iconStyles} />,
  },
  {
    heading: "Test 3",
    text: "Lorem ipsum dolor sit amet,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: <icon.Twitter className={iconStyles} />,
  },
]

export const InfoCards = () => {
  return (
    <div className="grid gap-2 md:grid-rows-1 md:grid-cols-3 sm:cols-1 sm:auto-rows-auto">
      {INFO_CARDS.map(({ heading, text, icon }) => (
        <div className="relative p-5 rounded-md shadow-md bg-slate-500">
          <h1 className="mb-2 text-xl tracking-wide text-center">{heading}</h1>
          <div className="text-sm ">{text}</div>
          {icon}
        </div>
      ))}
    </div>
  )
}
