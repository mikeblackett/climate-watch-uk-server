import * as services from '../services/data/aggregate.services.js'

import jsend from '../utilities/jsend.js'

async function getMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const list = await services.monthAggregate({
      location,
      variable,
      month,
      start,
      end,
    })
    response.json(
      jsend.success({ location, variable, month, start, end, list })
    )
  } catch (error) {
    next(error)
  }
}

async function getSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const list = await services.seasonAggregate({
      location,
      variable,
      season,
      start,
      end,
    })
    response.json(
      jsend.success({ location, variable, season, start, end, list })
    )
  } catch (error) {
    next(error)
  }
}

async function getYear(request, response, next) {
  try {
    const { location, variable, year, start, end } = request.query
    const list = await services.yearAggregate({
      location,
      variable,
      start,
      end,
    })
    response.json(jsend.success({ location, variable, start, end, list }))
  } catch (error) {
    next(error)
  }
}

export { getMonth, getSeason, getYear }
