import { months } from './month.js'
import { years } from './year.js'

function generateTimes(years, months) {
  let times = []

  for (let y = 0; y < years.length; y++) {
    for (let m = 0; m < months.length; m++) {
      times.push({
        year: years[y].year,
        month: months[m].number,
      })
    }
  }
  return times
}

export { generateTimes }
