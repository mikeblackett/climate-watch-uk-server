import * as rankServices from '../services/data/rank.services.js'

import jsend from '../utilities/jsend.js'

async function getMonth(request, response, next) {
  try {
    const { location, variable, month, year, start, end } = request.query
    const list = await rankServices.monthRank({
      month,
      year,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ list }))
  } catch (error) {
    next(error)
  }
}

async function getSeason(request, response, next) {
  try {
    const { location, variable, season, year, start, end } = request.query
    const list = await rankServices.seasonRank({
      season,
      year,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ list }))
  } catch (error) {
    next(error)
  }
}

async function getYear(request, response, next) {
  try {
    const { year, location, variable, start, end } = request.query
    const list = await rankServices.yearRank({
      year,
      start,
      end,
      location,
      variable,
    })
    response.json(jsend.success({ list }))
  } catch (error) {
    next(error)
  }
}

export { getMonth, getSeason, getYear }
