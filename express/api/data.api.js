import { raw } from 'objection'
import { Observation, Time, Location } from '../../database/index.js'
import { BadRequestError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

function firstYear(location) {
  return Observation.query()
    .alias('y')
    .select(
      'y.variable_id',
      raw(`extract(year from min(t.date))`).as('first_year')
    )
    .innerJoin('times as t', 'y.time_id', 't.id')
    .where('y.location_id', location)
    .groupBy('y.variable_id')
}

function annualAverages(location) {
  return Observation.query()
    .alias('o')
    .select(
      'o.variable_id',
      'o.location_id',
      't.year',
      raw(
        `dense_rank() over (partition by o.variable_id, o.location_id order by avg(o.value) desc)`
      ).as('rank'),
      raw(`round(avg(o.value), 1)`).as('value')
    )
    .joinRelated('times', { alias: 't' })
    .groupByRaw('t.year, o.variable_id, o.location_id')
    .where('o.location_id', location)
}

const seasonsEnum = {
  win: [12, 1, 2],
  spr: [3, 4, 5],
  sum: [6, 7, 8],
  aut: [9, 10, 11],
}

function seasonalAverages(location, season) {
  return Observation.query()
    .alias('o')
    .select(
      'o.variable_id',
      'o.location_id',
      't.season_year as year',
      raw(
        `dense_rank() over (partition by o.variable_id, o.location_id order by avg(o.value) desc)`
      ).as('rank'),
      raw(`round(avg(o.value), 1)`).as('value')
    )
    .joinRelated('times', { alias: 't' })
    .groupByRaw('t.season_year, o.variable_id, o.location_id')
    .where('o.location_id', location)
    .whereIn('t.month_number', seasonsEnum[season])
}

function monthlyValues(location, month_number) {
  return Observation.query()
    .alias('o')
    .select(
      'o.variable_id',
      'o.location_id',
      'o.value',
      't.year',
      't.month_number',
      raw(
        `dense_rank() over (partition by t.month_number, o.variable_id, o.location_id order by o.value desc)`
      ).as('rank')
    )
    .joinRelated('times', { alias: 't' })
    .where('o.location_id', location)
    .where('t.month_number', month_number)
}

function countYears(location) {
  return Observation.query()
    .select('variable_id')
    .countDistinct('times.year as count')
    .joinRelated('times')
    .where('location_id', location)
    .groupBy('variable_id')
}

async function getClimateSummary(request, response, next) {
  const { location, month, season, variable, year } = request.query
  try {
    if (!location || !year) {
      throw new BadRequestError(`Missing required query parameters`, {
        cause: {
          ...(!location && { location: 'Query must include a location id' }),
          ...(!year && { year: 'Query must include a year' }),
        },
      })
    }
    let query = Observation.query().select([
      'o.location_id',
      'o.variable_id',
      'o.year',
      'o.rank',
      'o.value',
      'y.first_year',
    ])
    if (month) {
      query = query
        .select('o.month_number')
        .from(monthlyValues(location, month).as('o'))
    } else if (season) {
      query = query.from(seasonalAverages(location, season).as('o'))
    } else {
      query = query.from(annualAverages(location).as('o'))
    }
    query = query
      .innerJoin(firstYear(location).as('y'), 'o.variable_id', 'y.variable_id')
      .where('year', year)
    const data = await query
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

export { getClimateSummary }
