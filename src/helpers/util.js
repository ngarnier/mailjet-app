export const getTS = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  d.setHours(0, 0, 0)
  d.setMilliseconds(0)
  return d / 1000 || 0
}
