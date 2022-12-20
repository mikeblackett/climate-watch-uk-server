import * as services from '../services/data/snapshot.services.js'

import jsend from '../utilities/jsend.js'

async function getMonth(request, response, next) {
  try {
    const { location, variable, month, year } = request.query
    const list = await services.monthSnapshot({
      location,
      variable,
      month,
      year,
    })
    response.json(jsend.success({ location, variable, month, year, list }))
  } catch (error) {
    next(error)
  }
}

async function getSeason(request, response, next) {
  try {
    const { location, variable, season, year } = request.query
    const list = await services.seasonSnapshot({
      location,
      variable,
      season,
      year,
    })
    response.json(jsend.success({ location, variable, season, year, list }))
  } catch (error) {
    next(error)
  }
}

async function getYear(request, response, next) {
  try {
    const { location, variable, year } = request.query
    const list = await services.yearSnapshot({
      location,
      variable,
      year,
    })
    response.json(jsend.success({ location, variable, year, list }))
  } catch (error) {
    next(error)
  }
}

export { getMonth, getSeason, getYear }
