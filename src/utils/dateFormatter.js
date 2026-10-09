export function formatMemoryDate(timestamp) {
  if (!timestamp) return ''

  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) return ''

  const now = new Date()

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

  const time = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  if (isToday) {
    return time
  }

  const datePart = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() && {
      year: 'numeric',
    }),
  }).format(date)

  return `${datePart} · ${time}`
}
