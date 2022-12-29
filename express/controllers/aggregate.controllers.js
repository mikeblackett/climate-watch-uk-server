import * as services from '../services/aggregate.services.js'

import jsend from '../utilities/jsend.js'

async function getAggregateMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const result = await services.aggregateMonth({
      location,
      variable,
      month,
      start,
      end,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getAggregateSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const result = await services.aggregateSeason({
      location,
      variable,
      season,
      start,
      end,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getAggregateYear(request, response, next) {
  try {
    const { location, variable, year, start, end } = request.query
    const result = await services.aggregateYear({
      location,
      variable,
      start,
      end,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

export { getAggregateMonth, getAggregateSeason, getAggregateYear }
