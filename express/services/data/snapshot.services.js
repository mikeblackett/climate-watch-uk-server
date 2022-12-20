import db from '../../../database/index.js'
import { filterOrSelectVariable } from './slice.services.js'

const { Climate } = db.models

function monthSnapshot({ month, year, location, variable }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(ref('value'))
    .modify('filterByYear', year)
    .modify('filterByLocation', location)
    .modify('filterByMonth', month)
    .modify(filterOrSelectVariable, variable)
  return query
}

function seasonSnapshot({ season, year, location, variable }) {
  const query = Climate.query()
    .modify('averageBySeason')
    .modify('filterBySeasonYear', year)
    .modify('filterByLocation', location)
    .modify('filterBySeason', season)
    .modify(filterOrSelectVariable, variable)
  return query
}

function yearSnapshot({ year, location, variable }) {
  const query = Climate.query()
    .modify('averageByYear')
    .modify('filterByYear', year)
    .modify('filterByLocation', location)
    .modify(filterOrSelectVariable, variable)
  return query
}

export { monthSnapshot, seasonSnapshot, yearSnapshot }
