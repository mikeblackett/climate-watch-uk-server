import db from '../../../database/index.js'
import { monthSlice, seasonSlice, yearSlice } from './slice.services.js'

const { Climate } = db.models

function monthRank({ month, year, start, end, location, variable }) {
  const query = Climate.query()
    .alias('rq')
    .from(monthSlice({ month, location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
  return query
}

function seasonRank({ season, year, start, end, location, variable }) {
  const query = Climate.query()
    .alias('rq')
    .from(seasonSlice({ season, location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
  return query
}

function yearRank({ year, start, end, location, variable }) {
  const query = Climate.query()
    .alias('rq')
    .from(yearSlice({ location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
  return query
}

export { monthRank, seasonRank, yearRank }
