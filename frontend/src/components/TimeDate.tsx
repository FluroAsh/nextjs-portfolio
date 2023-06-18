import dayjs from "dayjs"

export const TimeDate: React.FC<{ createdAt: string }> = ({ createdAt }) => {
  const advancedFormat = require("dayjs/plugin/advancedFormat")
  dayjs.extend(advancedFormat)

  return (
    <div className="sm:items-center sm:flex">
      <h3 className="font-semibold text-neutral-700 dark:text-slate-300 md:text-lg">
        {dayjs(createdAt).format("dddd, Do MMMM")}
      </h3>
    </div>
  )
}
