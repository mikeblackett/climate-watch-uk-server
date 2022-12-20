import * as services from '../services/data/slice.services.js'

import jsend from '../utilities/jsend.js'

async function getMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const list = await services.monthSlice({
      location,
      variable,
      month,
      start,
      end,
    })
    response.json(
      jsend.success({ location, variable, start, end, month, list })
    )
  } catch (error) {
    next(error)
  }
}

async function getSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const list = await services.seasonSlice({
      location,
      variable,
      season,
      start,
      end,
    })
    response.json(
      jsend.success({ location, variable, start, end, season, list })
    )
  } catch (error) {
    next(error)
  }
}

async function getYear(request, response, next) {
  try {
    const { location, variable, start, end } = request.query
    const list = await services.yearSlice({
      location,
      variable,
      start,
      end,
    })
    response.json(jsend.success({ location, start, end, variable, list }))
  } catch (error) {
    next(error)
  }
}

export { getMonth, getSeason, getYear }
