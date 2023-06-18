import clsx from "clsx"
import dayjs from "dayjs"

import { readingMinutes } from "utils/blog-utils"

export interface TimeDateProps {
  createdAt: string
  type: "index" | "post"
  minutes?: number
}

export const TimeDate: React.FC<TimeDateProps> = ({
  createdAt,
  type,
  minutes,
}) => {
  const advancedFormat = require("dayjs/plugin/advancedFormat")
  dayjs.extend(advancedFormat)

  const isIndex = type === "index"

  const indexStyles = {
    container: isIndex && "sm:items-center sm:flex",
    h3: isIndex && "md:text-lg ",
  }

  const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={clsx(indexStyles.container)}>{children}</div>
  )

  const timeStamp = dayjs(createdAt).format("dddd, Do MMMM")

  if (type === "index") {
    return (
      <Container>
        <h3
          className={clsx(
            "font-semibold text-neutral-800 dark:text-neutral-300",
            indexStyles.h3
          )}
        >
          {timeStamp}
        </h3>
      </Container>
    )
  }

  if (type === "post" && minutes) {
    return (
      <Container>
        <h3 className="text-neutral-600 dark:text-slate-300">
          {timeStamp} — {readingMinutes(minutes)}
        </h3>
      </Container>
    )
  }

  return null
}
