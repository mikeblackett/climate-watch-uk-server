import * as variableServices from '../services/meta/variable.services.js'
import jsend from '../utilities/jsend.js'

async function getAll(request, response, next) {
  try {
    response.json(jsend.success(await variableServices.findAll()))
  } catch (error) {
    next(error)
  }
}

async function getById(request, response, next) {
  try {
    const { id } = request.params
    response.json(jsend.success(await variableServices.findById(id)))
  } catch (error) {
    next(error)
  }
}

export { getAll, getById }
