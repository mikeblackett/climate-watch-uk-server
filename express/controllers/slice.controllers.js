import * as services from '../services/slice.services.js'

import jsend from '../utilities/jsend.js'

async function getSliceMonth(request, response, next) {
  try {
    const { location, variable, month, start, end } = request.query
    const result = await services.sliceMonth({
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

async function getSliceSeason(request, response, next) {
  try {
    const { location, variable, season, start, end } = request.query
    const result = await services.sliceSeason({
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

async function getSliceYear(request, response, next) {
  try {
    const { location, variable, start, end } = request.query
    const result = await services.sliceYear({
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

export { getSliceMonth, getSliceSeason, getSliceYear }
