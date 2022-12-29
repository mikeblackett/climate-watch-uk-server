import { raw } from 'objection'
import db from '../../database/index.js'

const { Climate } = db.models

function aggregateMonth({ month, location, variable, start, end }) {
  const { ref } = Climate
  let query = Climate.query()
    .select(ref('month'), ref('variable_id'))
    .max('year as end')
    .min('year as start')
    .groupBy(ref('month'))
    .modify('average')
    .modify('filterByYearRange', [start, end])
    .modify('filterByLocation', location)
  if (month) {
    query.modify('filterByMonth', month)
  }
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function aggregateSeason({ season, location, variable, start, end }) {
  const { ref } = Climate
  let query = Climate.query()
    .select(ref('season'), ref('variable_id'))
    .max('year as end')
    .min('year as start')
    .groupBy(ref('season'))
    .modify('average')
    .modify('filterBySeasonYearRange', [start, end])
    .modify('filterByLocation', location)
  if (season) {
    query.modify('filterBySeason', season)
  } else {
    query.select(ref('season')).groupBy(ref('season')).orderBy(ref('season'))
  }
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function aggregateYear({ location, variable, start, end } = {}) {
  const { ref } = Climate
  let query = Climate.query()
    .select(ref('variable_id'))
    .max('year as end')
    .min('year as start')
    .modify('average')
    .modify('filterByYearRange', [start, end])
    .modify('filterByLocation', location)
  if (variable) {
    query.modify('filterByVariable', variable)
  } else {
    query.select(ref('variable_id'))
  }
  return query
}

export { aggregateMonth, aggregateSeason, aggregateYear }
