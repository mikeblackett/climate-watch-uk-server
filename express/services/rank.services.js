import db from '../../database/index.js'
import { sliceMonth, sliceSeason, sliceYear } from './slice.services.js'

const { Climate } = db.models

function rankMonth({ month, year, start, end, location, variable }) {
  return Climate.query()
    .alias('rq')
    .from(sliceMonth({ month, location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
}

function rankSeason({ season, year, start, end, location, variable }) {
  return Climate.query()
    .alias('rq')
    .from(sliceSeason({ season, location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
}

function rankYear({ year, start, end, location, variable }) {
  return Climate.query()
    .alias('rq')
    .from(sliceYear({ location, variable, start, end }).as('rq'))
    .modify('filterByYear', year)
}

export { rankMonth, rankSeason, rankYear }
