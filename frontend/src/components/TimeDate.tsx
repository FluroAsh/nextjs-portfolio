import clsx from "clsx"
import dayjs from "dayjs"

import { readingMinutes } from "lib/utils"

export interface TimeDateProps {
  createdAt: string
  type: "index" | "post"
  /** `minutes` is used within the context of a Blog post for time to read. */
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
    container: "sm:items-center sm:flex",
    h3: "md:text-lg ",
  } as const

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className={clsx(isIndex && indexStyles.container)}>{children}</div>
  )

  const timeStamp = dayjs(createdAt).format("dddd, Do MMMM")

  if (type === "index") {
    return (
      <Container>
        <h3
          className={clsx(
            "font-semibold text-neutral-600 dark:text-neutral-300",
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
