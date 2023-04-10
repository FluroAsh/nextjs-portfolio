export function truncateTitle(title: string) {
  return title.length >= 16 ? `${title.substring(0, 13)}...` : title
}

export const readingMinutes = (minutes: number) => {
  const roundedMinutes = Math.floor(minutes)
  return minutes > 1
    ? `${roundedMinutes} minutes reading`
    : `${roundedMinutes} minute read`
}
