export const formatDateTime = (
  timestamp: string,
  formatType: 'mm/dd/yyyy' | 'mmyy' | 'yymm' = 'mm/dd/yyyy',
): string => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return ''

  const monthIndex = date.getMonth()
  const day = date.getDate()
  const YYYY = date.getFullYear()

  if (formatType === 'mmyy' || formatType === 'yymm') {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const monthName = monthNames[monthIndex]
    return formatType === 'mmyy' ? `${monthName} ${YYYY}` : `${YYYY} ${monthName}`
  }

  const MM = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1
  const DD = day < 10 ? `0${day}` : day

  return `${MM}/${DD}/${YYYY}`
}
