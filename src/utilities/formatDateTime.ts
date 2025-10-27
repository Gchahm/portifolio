export const formatDateTime = (
  timestamp: string,
  formatType: 'mm/dd/yyyy' | 'mmyy' = 'mm/dd/yyyy',
): string => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return ''

  const monthIndex = date.getMonth()
  const day = date.getDate()
  const YYYY = date.getFullYear()

  if (formatType === 'mmyy') {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const monthName = monthNames[monthIndex]
    return `${monthName} ${YYYY}`
  }

  const MM = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1
  const DD = day < 10 ? `0${day}` : day

  return `${MM}/${DD}/${YYYY}`
}
