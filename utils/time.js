export const getParseDate = (dateString) => {
  const date = new Date(dateString)
  const displayDate = [
    date.getFullYear(),
    toDoubleDigits(date.getMonth() + 1),
    toDoubleDigits(date.getDate()),
  ]
  return displayDate.join('-')
}

export const getParseMonth = (dateString) => {
  const date = new Date(dateString)
  const displayDate = [date.getFullYear(), toDoubleDigits(date.getMonth() + 1)]
  return displayDate.join('-')
}

const toDoubleDigits = (num) => {
  num += ''
  if (num.length === 1) {
    num = '0' + num
  }
  return num
}
