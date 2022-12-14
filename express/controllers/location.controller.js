import { query, param } from 'express-validator'
import { requestValidator } from '../middlewares/request-validator.js'
import locationServices from '../services/locations.services.js'
import jsend from '../utilities/jsend.js'

function validate(method) {
  let validator
  switch (method) {
    case 'getAll':
      validator = query('type')
        .if(query('type').exists())
        .isIn(['region', 'country'])
        .withMessage("Location type must be one of: 'region, country'.")
      break
    case 'getById':
      validator = param('id')
        .exists()
        .withMessage('Must specify an ID')
        .isString()
        .withMessage('ID should be a string')
      break
    default:
      return requestValidator
  }
  return [validator, requestValidator]
}

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

export default { getAll, getById, getChildrenById, validate }
