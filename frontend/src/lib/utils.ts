import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { formatName, type Formats } from "types/api-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Should only truncate when screen size <= 768px
export const truncateTitle = (title: string) => {
  const CHAR_LIMIT = 25
  return title.length >= CHAR_LIMIT
    ? `${title.substring(0, CHAR_LIMIT)}...`
    : title
}

export const readingMinutes = (
  minutes: number,
  textType: "flex" | "singular" = "flex"
) => {
  const roundedMinutes = Math.ceil(minutes)
  return minutes > 1 && textType !== "singular"
    ? `${roundedMinutes} minutes reading`
    : `${roundedMinutes} minute read`
}

/** Validates we have the correct formats at build time */
export const checkImgFormats = (formats: Formats) => {
  const validFormat =
    Object.keys(formats).filter((key: any) =>
      [
        formatName.LARGE,
        formatName.MEDIUM,
        formatName.SMALL,
        formatName.THUMBNAIL,
      ].includes(key)
    ).length > 0

  if (!validFormat)
    throw Error(
      "\n\n🚨 Invalid format for Blog Image. Check the uploaded image.\n\n"
    )
}

export const capitalize = (word: string) =>
  word[0].toUpperCase() + word.slice(1)

export const scrollToElement = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    })
  }
}
