import db from '../../../database/index.js'

const { Climate } = db.models

function monthSnapshot({ month, year, location, variable }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(
      ref('location_id'),
      ref('variable_id'),
      ref('year'),
      ref('month'),
      ref('value')
    )
    .modify('filterByYear', year)
    .modify('filterByLocation', location)
    .modify('filterByMonth', month)
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function seasonSnapshot({ season, year, location, variable }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(
      ref('location_id'),
      ref('variable_id'),
      ref('season_year as year'),
      ref('season')
    )
    .modify('averageBySeason')
    .modify('filterBySeasonYear', year)
    .modify('filterByLocation', location)
    .modify('filterBySeason', season)
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

function yearSnapshot({ year, location, variable }) {
  const { ref } = Climate
  const query = Climate.query()
    .select(ref('location_id'), ref('variable_id'), ref('year'))
    .modify('averageByYear')
    .modify('filterByYear', year)
    .modify('filterByLocation', location)
  if (variable) {
    query.modify('filterByVariable', variable)
  }
  return query
}

export { monthSnapshot, seasonSnapshot, yearSnapshot }
