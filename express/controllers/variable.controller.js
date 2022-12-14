import { param } from 'express-validator'
import { requestValidator } from '../middlewares/request-validator.js'
import variableServices from '../services/variable.services.js'
import jsend from '../utilities/jsend.js'

function validate(method) {
  let validator
  switch (method) {
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

export default { getAll, getById, validate }
