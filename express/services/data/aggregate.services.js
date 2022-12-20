import { raw } from 'objection'
import db from '../../../database/index.js'

const { Climate } = db.models

function _aggregate(query, { variable, location, start, end }) {
  query
    .select(raw(`round(avg(value), 2) as value`))
    .groupBy(['variable_id', 'location_id'])
    .whereBetween('year', [start, end])
    .modify('filterByLocation', location)
  if (variable) {
    query.modify('filterByVariable', variable)
  } else {
    query.select('variable_id')
  }
  return query
}

function monthAggregate({ month, location, variable, start, end }) {
  let query = Climate.query()
    .modify(_aggregate, { location, variable, start, end })
    .select('month')
    .groupBy('month')
  if (month) {
    query.modify('filterByMonth', month)
  } else {
    query.orderBy('month')
  }
  return query
}

function seasonAggregate({ season, location, variable, start, end }) {
  let query = Climate.query()
    .modify(_aggregate, { location, variable, start, end })
    .select('season')
    .groupBy('season')
  if (season) {
    query.modify('filterBySeason', season)
  } else {
    query.orderBy('season')
  }
  return query
}

function yearAggregate({ location, variable, start, end } = {}) {
  let query = Climate.query().modify(_aggregate, {
    location,
    variable,
    start,
    end,
  })
  return query
}

export { monthAggregate, seasonAggregate, yearAggregate }
