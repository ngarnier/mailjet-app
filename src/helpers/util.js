
const months = [
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
  'December']

export const getMonthTS = () => {
  const d = new Date()
  d.setUTCMonth(d.getUTCMonth() - 1)
  d.setUTCDate(d.getUTCDate())
  d.setUTCHours(0, 0, 0, 0)
  return d / 1000 || 0
}

export const getWeekTS = () => {
  const d = new Date()
  d.setUTCMonth(d.getUTCMonth())
  d.setUTCDate(d.getUTCDate() - 7)
  d.setUTCHours(0, 0, 0, 0)
  return d / 1000 || 0
}

export const getDayTS = () => {
  const d = new Date()
  d.setMonth(d.getMonth())
  d.setDate(d.getDate())
  d.setHours(d.getHours() - 24, 0, 0, 0)
  return d / 1000 || 0
}

export const formatTime = (time) => {
  if (time.toString().length < 2) {
    return `0${time}`
  }
  return time
}

export const convertTimestamp = (timestamp, format) => {
  const date = new Date(timestamp)
  if (format === 'short') {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${formatTime(date.getHours())}h${formatTime(date.getMinutes())} UTC`
}

export const formatNumber = (number) => {
  if (number >= 1000000) {
    return `${number / 1000000}M`
  } else if (number >= 10000) {
    return `${number / 1000}K`
  }
  return number
}
