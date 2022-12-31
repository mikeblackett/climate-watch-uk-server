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
    .modify('rank', { order, timeScale: 'month' })
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
    .modify('aggregate', { method: 'avg', timeScale: 'season' })
    .modify('rank', { order, timeScale: 'season' })
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
  const subquery = Climate.query()
    .select('variable_id')
    .min('year as min_year')
    .groupBy('variable_id', 'location_id')
    .modify('filterByYearRange', [start, end])
    .modify('filterByLocation', location)
  const query = Climate.query()
    .select([ref('location_id'), ref('variable_id'), ref('year')])
    .modify('aggregate', { method: 'avg', timeScale: 'year' })
    .modify('rank', { order, timeScale: 'year' })
    .modify('filterByLocation', location)
    .modify('filterByYearRange', [start, end])
    .orderBy(ref('year'))
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

export { sliceMonth, sliceSeason, sliceYear }
