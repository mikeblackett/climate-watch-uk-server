import db from '../../database/index.js'

const { Climate } = db.models

async function yearAverage(location, variable, year) {
  let query = Climate.query()
    .alias('c')
    .from(Climate.query().modify('getYears', true).as('c'))
    .modify('filterByYear', year)
    .orderBy('c.rank')
  if (variable) {
    query = query.modify('filterByVariable', variable)
  }
  if (location) {
    query = query.modify('filterByLocation', location)
  }
  return await query
}

async function monthAverage(location, variable, year, month) {
  let query = Climate.query()
    .alias('c')
    .from(Climate.query().modify('getMonths', true).as('c'))
    .modify('filterByYear', year)
    .modify('filterByMonth', month)
    .orderBy('c.rank')
  if (variable) {
    query = query.modify('filterByVariable', variable)
  }
  if (location) {
    query = query.modify('filterByLocation', location)
  }
  return await query
}

export { yearAverage, monthAverage }
