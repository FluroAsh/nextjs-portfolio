import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { formatName, type Formats } from "types/api-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Should only truncate when screen size <= 768px
export function truncate(string: string, charLimit = 25) {
  return string.length >= charLimit
    ? `${string.substring(0, charLimit)}...`
    : string
}

export function readingMinutes(minutes: number) {
  const roundedMinutes = Math.ceil(minutes)
  return minutes > 0 ? `${roundedMinutes} min read` : "Less than a minute!"
}

/** Validates we have the correct formats at build time */
export function checkImgFormats(formats: Formats) {
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

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1)
}

export function calculateDarkValues(
  r: number,
  g: number,
  b: number,
  factor: number,
  options: { isText?: boolean; isBorder?: boolean } = {}
) {
  const { isText, isBorder } = options
  const darkness = (r + g + b) / 3 // Calculate the darkness level based on RGB values

  const DARKNESS_THRESHOLD = 40 // Min acceptable value of R+G+B / 3 (max 255)
  const BRIGHTEN_FACTOR = 1.5 // Increase brightness by 50%

  if (darkness < DARKNESS_THRESHOLD) {
    r = Math.min(255, Math.floor(r * BRIGHTEN_FACTOR))
    g = Math.min(255, Math.floor(g * BRIGHTEN_FACTOR))
    b = Math.min(255, Math.floor(b * BRIGHTEN_FACTOR))
  } else {
    r = Math.floor(r * factor)
    g = Math.floor(g * factor)
    b = Math.floor(b * factor)
  }

  if (darkness < 10 && isText) {
    r = 210
    g = 210
    b = 210
  } else if (darkness < 10 && isBorder) {
    r = 50
    g = 50
    b = 50
  }
  return `rgb(${r}, ${g}, ${b})`
}
