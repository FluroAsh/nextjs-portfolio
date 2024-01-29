import { faCalendar, faTimer } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import { cn, readingMinutes } from "lib/utils"

const DEFAULT_TIMEZONE = "Australia/Melbourne"

dayjs.extend(utc)
dayjs.extend(tz)
dayjs.tz.setDefault(DEFAULT_TIMEZONE)
dayjs.extend(advancedFormat)

type TimeDateIndex = { type: "index"; minutes?: never }
type TimeDatePost = {
  type: "post" | "home"
  minutes: number
}

export type TimeDateProps = {
  createdAt: string
  className?: string
} & (TimeDateIndex | TimeDatePost)

const Container = ({
  children,
  isIndex,
  className,
}: {
  children: React.ReactNode
  isIndex: boolean
  className?: string
}) => (
  <div className={cn(isIndex && "sm:items-center sm:flex", className)}>
    {children}
  </div>
)

export const TimeDate: React.FC<TimeDateProps> = ({
  createdAt,
  type,
  minutes,
  className: extraStyles,
}) => {
  const isIndex = type === "index"

  /**
   * NOTE: Required to explicitly set the time zone using the Dayjs tz plugin to resolve
   * discrepancies between the server and client-side date formatting. Otherwise we encounter
   * hydration errors.
   */

  const timeStamp = dayjs.utc(createdAt).format("dddd, Do MMMM")

  if (type === "index") {
    return (
      <Container isIndex={isIndex} className={extraStyles}>
        <h3
          className={cn(
            "font-semibold text-neutral-600 dark:text-neutral-300",
            "md:text-lg"
          )}
        >
          {timeStamp}
        </h3>
      </Container>
    )
  }

  if (type === "post" && minutes) {
    return (
      <Container isIndex={isIndex} className={extraStyles}>
        <h3 className="text-neutral-600 dark:text-slate-300 font-bold">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          {timeStamp} • {readingMinutes(minutes)}
        </h3>
      </Container>
    )
  }

  if (type === "home" && minutes) {
    return (
      <Container isIndex={isIndex} className={extraStyles}>
        <h3 className="text-lg text-neutral-300 dark:text-slate-300">
          {timeStamp}
        </h3>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faTimer}
            className="text-neutral-300 dark:text-slate-300 w-[14px] h-[14px] mt-[0.5px]"
          />

          <span className="text-sm font-semibold text-neutral-300 dark:text-slate-300 pl-[6px]">
            {readingMinutes(minutes)}
          </span>
        </div>
      </Container>
    )
  }
  return null
}
