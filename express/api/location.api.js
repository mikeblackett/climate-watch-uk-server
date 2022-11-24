import { Location } from '../../database/index.js'
import { Payload } from './payload.js'
import { BadRequestError, NotFoundError } from '../error/client.error.js'

const payload = new Payload()

async function getAllLocations(request, response, next) {
  const { type } = request.query
  if (type) {
    return getLocationsByType(request, response, next)
  }
  try {
    const data = await Location.query()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getLocationsByType(request, response, next) {
  const { type } = request.query
  const query = Location.query()
  try {
    const data = await query.where('type', type)
    if (!data.length) {
      throw new BadRequestError(`location id`, {
        cause: { id: `Wrong location type '${type}'` },
      })
    }
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getLocationById(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.query().findById(id)
    if (data === undefined) {
      throw new NotFoundError(`location`, {
        cause: { id: `Location id '${id}' not found` },
      })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getLocationChildrenById(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.relatedQuery('children').for(id)
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

export {
  getAllLocations,
  getLocationsByType,
  getLocationById,
  getLocationChildrenById,
}
