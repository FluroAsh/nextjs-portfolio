// Used mainly for blog post dates
export const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'GMT',
  month: 'long',
  day: '2-digit',
  year: 'numeric'
})
