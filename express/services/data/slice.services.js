import { raw } from 'objection'
import db from '../../../database/index.js'

const { Climate } = db.models

function monthSlice({ month, location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([ref('location_id'), ref('year'), ref('month'), ref('value')])
    .modify('rankByMonth', order)
    .modify('filterByLocation', location)
    .modify('filterByYearRange', [start, end])
    .orderBy(ref('year'))
  if (month) {
    query.modify('filterByMonth', month)
  }
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function seasonSlice({ season, location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([ref('location_id'), ref('season_year').as('year'), ref('season')])
    .modify('averageBySeason')
    .modify('rankBySeasonAverage', order)
    .modify('filterByLocation', location)
    .modify('filterBySeasonYearRange', [start, end])
    .orderBy(ref('season_year'))

  if (season) {
    query.modify('filterBySeason', season)
  }
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function yearSlice({ location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([ref('location_id'), ref('year')])
    .modify('averageByYear')
    .modify('rankByYearAverage', order)
    .modify('filterByLocation', location)
    .modify('filterByYearRange', [start, end])
    .orderBy(ref('year'))
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

export { monthSlice, seasonSlice, yearSlice }
