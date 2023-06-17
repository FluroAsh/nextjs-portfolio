import { formatName, Formats } from "types/api-types"

export const truncateTitle = (title: string) =>
  title.length >= 16 ? `${title.substring(0, 13)}...` : title

export const readingMinutes = (minutes: number) => {
  const roundedMinutes = Math.round(minutes)
  return minutes > 1
    ? `${roundedMinutes} minutes reading`
    : `${roundedMinutes} minute read`
}

export const checkImgFormats = (formats: Formats) => {
  const validFormat =
    Object.keys(formats).filter((key: any) =>
      [
        formatName.LARGE,
        formatName.MEDIUM,
        formatName.SMALL,
        formatName.SMALL,
      ].includes(key)
    ).length > 0

  if (!validFormat)
    throw Error(
      "\n\n🚨 Invalid format for Blog Image. Check the uploaded image.\n\n"
    )
}
