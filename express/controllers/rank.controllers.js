import * as rankServices from '../services/data/rank.services.js'

import jsend from '../utilities/jsend.js'

async function getRankMonth(request, response, next) {
  try {
    const { location, variable, month, year, start, end } = request.query
    const list = await rankServices.rankMonth({
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

async function getRankSeason(request, response, next) {
  try {
    const { location, variable, season, year, start, end } = request.query
    const list = await rankServices.rankSeason({
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

async function getRankYear(request, response, next) {
  try {
    const { year, location, variable, start, end } = request.query
    const list = await rankServices.rankYear({
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

export { getRankMonth, getRankSeason, getRankYear }
