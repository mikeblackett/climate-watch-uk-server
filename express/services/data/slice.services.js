import { raw } from 'objection'
import db from '../../../database/index.js'

const { Climate } = db.models

function filterOrSelectVariable(query, variable) {
  if (variable) {
    query.modify('filterByVariable', variable)
  } else {
    query.select(ref('variable_id'))
  }
  return query
}

function monthSlice({ month, location, variable, start, end }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([ref('year'), ref('value')])
    .modify('rankByMonth')
    .modify('filterByLocation', location)
    .modify('filterByYearRange', [start, end])
    .modify(filterOrSelectVariable, variable)
  if (month) {
    query.modify('filterByMonth', month)
  } else {
    query.select(ref('month'))
  }
  return query
}

function seasonSlice({ season, location, variable, start, end }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(ref('season_year').as('year'))
    .modify('averageBySeason')
    .modify('rankBySeasonAverage')
    .modify('filterByLocation', location)
    .modify('filterBySeasonYearRange', [start, end])
    .modify(filterOrSelectVariable, variable)
  if (season) {
    query.modify('filterBySeason', season)
  } else {
    query.select(ref('season'))
  }
  return query
}

function yearSlice({ location, variable, start, end }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(ref('year'))
    .modify('averageByYear')
    .modify('rankByYearAverage')
    .modify('filterByLocation', location)
    .modify('filterByYearRange', [start, end])
    .modify(filterOrSelectVariable, variable)
  return query
}

export { filterOrSelectVariable, monthSlice, seasonSlice, yearSlice }
