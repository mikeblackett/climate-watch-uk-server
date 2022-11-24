import { Observation, Time, Location } from '../../database/index.js'
import { BadRequestError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

async function getSnapshotMonthInYear(request, response, next) {
  const { month, location, variable, year } = request.query
  try {
    if (!month || !location || !year) {
      throw new BadRequestError(`Missing required query parameters`, {
        cause: {
          ...(!location && { location: 'Query must include a location id' }),
          ...(!month && { month: 'Query must include a month number' }),
          ...(!year && { year: 'Query must include a year' }),
        },
      })
    }
    let query = Observation.query()
      .select(
        'value',
        'variable_id',
        'location_id',
        'times.month_number as month_number',
        'times.year as year'
      )
      .innerJoin('times', 'times.id', 'observations.time_id')
      .where('location_id', location)
      .where('year', year)
      .where('month_number', month)
    if (variable) {
      query = query.where('variable_id', variable)
    }
    const data = await query
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotYear(request, response, next) {
  const { location, variable, year } = request.query
  try {
    if (!location || !year) {
      throw new BadRequestError(`Missing required query parameters`, {
        cause: {
          ...(!location && { location: 'Query must include a location id' }),
          ...(!year && { year: 'Query must include a year' }),
        },
      })
    }
    const query = Observation.query()
      .select('variable_id', 'location_id', 'times.year as year')
      .avg('value as value')
      .innerJoin('times', 'times.id', 'observations.time_id')
      .where('location_id', location)
      .where('year', year)
      .groupBy('year', 'location_id', 'variable_id')
    if (variable) {
      const data = await query.where('variable_id', variable).first()
      return response.json(payload.success(data))
    }
    const data = await query
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

export { getSnapshotMonthInYear, getSnapshotYear }
