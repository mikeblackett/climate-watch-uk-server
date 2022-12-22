import * as locationServices from '../services/meta/location.services.js'
import jsend from '../utilities/jsend.js'

async function getAllLocations(request, response, next) {
  try {
    const { type } = request.query
    if (type) {
      return response.json(
        jsend.success(await locationServices.findByType(type))
      )
    }
    response.json(jsend.success(await locationServices.findAll()))
  } catch (error) {
    next(error)
  }
}

async function getLocationById(request, response, next) {
  try {
    const { id } = request.params
    response.json(jsend.success(await locationServices.findById(id)))
  } catch (error) {
    next(error)
  }
}

async function getLocationChildrenById(request, response, next) {
  try {
    const { id } = request.params
    response.json(jsend.success(await locationServices.findChildrenById(id)))
  } catch (error) {
    next(error)
  }
}

export { getAllLocations, getLocationById, getLocationChildrenById }
