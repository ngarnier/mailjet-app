
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
  d.setUTCHours(0, 0, 0)
  d.setUTCSeconds(0)
  d.setUTCMilliseconds(0)
  return d / 1000 || 0
}

export const getWeekTS = () => {
  const d = new Date()
  d.setUTCMonth(d.getUTCMonth())
  d.setUTCDate(d.getUTCDate() - 7)
  d.setUTCHours(0, 0, 0)
  d.setUTCSeconds(0)
  d.setUTCMilliseconds(0)
  return d / 1000 || 0
}

export const getTodayTS = () => {
  const now = new Date(Date.now())
  const day = now.getUTCDate()
  const month = now.getUTCMonth()
  const year = now.getUTCFullYear()
  const d = new Date(year, month, day, 0, 0, 0)
  // console.log(d)
  // console.log(Date.parse(d) / 1000)
  // const d2 = new Date(2018, 11 - 1, 15, 0, 0, 0)
  // console.log(d2)
  // console.log(Date.parse(d2) / 1000)
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
