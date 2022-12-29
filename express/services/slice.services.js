import { raw } from 'objection'
import db from '../../database/index.js'

const { Climate } = db.models

function sliceMonth({ month, location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([
      ref('location_id'),
      ref('variable_id'),
      ref('year'),
      ref('month'),
      ref('value'),
    ])
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

function sliceSeason({ season, location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([
      ref('location_id'),
      ref('variable_id'),
      ref('season_year').as('year'),
      ref('season'),
    ])
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

function sliceYear({ location, variable, start, end, order }) {
  const { ref } = Climate
  const query = Climate.query()
    .select([ref('location_id'), ref('variable_id'), ref('year')])
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

export { sliceMonth, sliceSeason, sliceYear }
