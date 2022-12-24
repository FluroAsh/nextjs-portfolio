export const handleTheme = (theme: string) => {
  if (!theme) {
    return 'dark'
  }

  return theme === 'dark' ? 'light' : 'dark'
}

export function truncateTitle(title: string) {
  return title.length >= 16 ? `${title.substring(0, 13)}...` : title
}
