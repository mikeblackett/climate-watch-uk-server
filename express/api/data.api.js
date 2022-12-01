import { raw } from 'objection'
import { Observation, Time, Location } from '../../database/index.js'
import { BadRequestError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

function firstYear(location) {
  return Observation.query()
    .alias('o')
    .select(
      'variable_id',
      raw(`extract(year from min(t.date))`).as('first_year')
    )
    .innerJoin('times as t', 'o.time_id', 't.id')
    .where('location_id', location)
    .groupBy('variable_id')
}

function annualAverages(location) {
  return Observation.query()
    .select(
      'variable_id',
      'location_id',
      'times.year as year',
      raw(
        `dense_rank() over (partition by variable_id, location_id order by avg(value) desc)`
      ).as('rank'),
      raw(`round(avg(value), 1) as value`)
    )
    .joinRelated('times')
    .groupByRaw('year, variable_id, location_id')
    .where('location_id', location)
}

function monthlyValues(location, month_number) {
  return Observation.query()
    .select(
      'variable_id',
      'location_id',
      'value',
      'times.year as year',
      'times.month_number as month_number',
      raw(
        `dense_rank() over (partition by month_number, variable_id, location_id order by value desc)`
      ).as('rank')
    )
    .joinRelated('times')
    .where('location_id', location)
    .where('month_number', month_number)
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
  const { location, month, variable, year } = request.query
  try {
    if (!location || !year) {
      throw new BadRequestError(`Missing required query parameters`, {
        cause: {
          ...(!location && { location: 'Query must include a location id' }),
          ...(!year && { year: 'Query must include a year' }),
        },
      })
    }
    let query = Location.query()
      .alias('l')
      .select([
        'l.id as id',
        'o.variable_id as variable_id',
        'o.year as year',
        'o.rank as rank',
        'o.value as value',
        'y.first_year as first_year',
      ])
      .where('year', year)

    if (month) {
      query = query
        .innerJoin(
          monthlyValues(location, month).as('o'),
          'l.id',
          'o.location_id'
        )
        .innerJoin(
          firstYear(location).as('y'),
          'o.variable_id',
          'y.variable_id'
        )
    } else {
      query = query
        .innerJoin(annualAverages(location).as('o'), 'l.id', 'o.location_id')
        .innerJoin(
          firstYear(location).as('y'),
          'o.variable_id',
          'y.variable_id'
        )
    }
    const data = await query
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

export { getClimateSummary }
