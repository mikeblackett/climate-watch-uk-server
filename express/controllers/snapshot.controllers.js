import * as services from '../services/data/snapshot.services.js'

import jsend from '../utilities/jsend.js'

async function getSnapshotMonth(request, response, next) {
  try {
    const { location, variable, month, year } = request.query
    const result = await services.snapshotMonth({
      location,
      variable,
      month,
      year,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotSeason(request, response, next) {
  try {
    const { location, variable, season, year } = request.query
    const result = await services.snapshotSeason({
      location,
      variable,
      season,
      year,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotYear(request, response, next) {
  try {
    const { location, variable, year } = request.query
    const result = await services.snapshotYear({
      location,
      variable,
      year,
    })
    response.json(jsend.success({ result }))
  } catch (error) {
    next(error)
  }
}

export { getSnapshotMonth, getSnapshotSeason, getSnapshotYear }
