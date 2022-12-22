import * as extremeServices from '../services/data/extreme.services.js'

import jsend from '../utilities/jsend.js'

async function getMaxMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const result = await extremeServices.maxMonth({
      month,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getMinMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const result = await extremeServices.minMonth({
      month,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getMaxSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const result = await extremeServices.maxSeason({
      season,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getMinSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const result = await extremeServices.minSeason({
      season,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getMaxYear(request, response, next) {
  try {
    const { location, variable, start, end } = request.query
    const result = await extremeServices.maxYear({
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getMinYear(request, response, next) {
  try {
    const { location, variable, start, end } = request.query
    const result = await extremeServices.minYear({
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

export {
  getMaxMonth,
  getMinMonth,
  getMaxSeason,
  getMinSeason,
  getMaxYear,
  getMinYear,
}
