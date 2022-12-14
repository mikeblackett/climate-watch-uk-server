import { Climate } from '../../database/index.js'
import { query, validationResult } from 'express-validator'
import { BadRequestError } from '../error/client.error.js'
import { Payload } from './utilities/Payload.js'

const payload = new Payload()

function snapshotValidator() {
  return [
    query('year').exists().withMessage('Query string requires year'),
    query('location').exists().withMessage('Query string requires location'),
    (request, response, next) => {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        const err = errors.array()[0]
        throw new BadRequestError('Malformed query string', {
          cause: {
            [err.param]: err.msg,
          },
        })
      }
      next()
    },
  ]
}

async function getSnapshot(request, response, next) {
  try {
    const { location, year, month, variable } = request.query
    let query = Climate.query().alias('c')
    if (month) {
      query = query
        .from(Climate.query().modify('getMonths', true).as('c'))
        .modify('filterByMonth', month)
    } else {
      query = Climate.query()
        .alias('c')
        .from(Climate.query().modify('getYears', true).as('c'))
    }
    if (variable) {
      query.modify('filterByVariable', variable)
    }
    const data = await query
      .modify('filterByLocation', location)
      .modify('filterByYear', year)
      .orderBy('c.rank')
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

export { getSnapshot, snapshotValidator }
