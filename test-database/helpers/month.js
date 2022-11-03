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

const months = monthNames.map((name, index) => ({
  name,
  number: index + 1,
}))

export { months }
