import * as locationServices from '../services/locations.services.js'
import jsend from '../utilities/jsend.js'

async function getAll(request, response, next) {
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

async function getById(request, response, next) {
  try {
    const { id } = request.params
    response.json(jsend.success(await locationServices.findById(id)))
  } catch (error) {
    next(error)
  }
}

async function getChildrenById(request, response, next) {
  try {
    const { id } = request.params
    response.json(jsend.success(await locationServices.findChildrenById(id)))
  } catch (error) {
    next(error)
  }
}

export { getAll, getById, getChildrenById }
