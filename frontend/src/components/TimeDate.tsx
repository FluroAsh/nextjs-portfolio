import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"

import { cn, readingMinutes } from "lib/utils"

dayjs.extend(advancedFormat)

type TimeDateIndex = { type: "index"; minutes?: never; textType?: never }
type TimeDatePost = {
  type: "post" | "stacked"
  minutes: number
  textType?: "flex" | "singular"
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
  textType,
  className: extraStyles,
}) => {
  const isIndex = type === "index"
  const timeStamp = dayjs(createdAt).format("dddd, Do MMMM")

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
        <h3 className="text-neutral-600 dark:text-slate-300">
          {timeStamp} — {readingMinutes(minutes)}
        </h3>
      </Container>
    )
  }

  if (type === "stacked" && minutes) {
    return (
      <Container isIndex={isIndex} className={extraStyles}>
        <h3 className="text-lg text-neutral-300 dark:text-slate-300">
          {timeStamp}
        </h3>
        <h3 className="text-sm font-semibold text-neutral-300 dark:text-slate-300">
          {readingMinutes(minutes, textType)}
        </h3>
      </Container>
    )
  }

  return null
}
