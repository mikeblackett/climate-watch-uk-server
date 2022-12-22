import db from '../../../database/index.js'
import { sliceMonth, sliceSeason, sliceYear } from './slice.services.js'

const { Climate } = db.models

function maxMonth({ month, location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(sliceMonth({ month, location, variable, start, end }).as('t'))
    .where('rank', 1)
}

function minMonth({ month, location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(
      sliceMonth({ month, location, variable, start, end, order: 'asc' }).as(
        't'
      )
    )
    .where('rank', 1)
}

function maxSeason({ season, location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(sliceSeason({ season, location, variable, start, end }).as('t'))
    .where('rank', 1)
}

function minSeason({ season, location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(
      sliceSeason({ season, location, variable, start, end, order: 'asc' }).as(
        't'
      )
    )
    .where('rank', 1)
}

function maxYear({ location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(sliceYear({ location, variable, start, end }).as('t'))
    .where('rank', 1)
}

function minYear({ location, variable, start, end }) {
  const { ref } = Climate
  return Climate.query()
    .alias('t')
    .select(ref('location_id'), ref('variable_id'), ref('year'), ref('value'))
    .from(sliceYear({ location, variable, start, end, order: 'asc' }).as('t'))
    .where('rank', 1)
}

export { maxMonth, minMonth, maxSeason, minSeason, maxYear, minYear }
