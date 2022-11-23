import { Location } from '../../database/index.js'
import { ApiError } from '../utilities/error.js'
import { Payload } from '../utilities/payload.js'
const payload = new Payload()

async function getAllLocationsApi(request, response, next) {
  const { type } = request.query
  const query = Location.query()
  try {
    let data
    if (type) {
      data = await query.where('type', type)
      if (!data.length) {
        return response.json(
          payload.fail({ type: `Unknown location type ('${type}')` })
        )
      }
    } else {
      data = await query
    }
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getLocationByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.query().findById(id)
    if (data === undefined) {
      return response.json(
        payload.fail({ id: `Unknown location id ('${id}')` })
      )
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getLocationChildrenByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.relatedQuery('children').for(id)
    if (data === undefined) {
      return response.json(
        payload.fail({ id: `Unknown location id ('${id}')` })
      )
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllLocationsApi, getLocationByIdApi, getLocationChildrenByIdApi }
