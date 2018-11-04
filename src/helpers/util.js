
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

export const getTS = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  d.setHours(0, 0, 0)
  d.setMilliseconds(0)
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
