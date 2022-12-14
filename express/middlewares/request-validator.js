import { validationResult } from 'express-validator'
import { BadRequestError } from '../utilities/error/client.error.js'

function formatCause(errorArr) {
  return errorArr.reduce((previous, current) => {
    previous[current.param] = current.msg
    return previous
  }, {})
}

async function requestValidator(request, response, next) {
  const errors = validationResult(request)
  if (errors.isEmpty()) {
    return next()
  }
  return next(
    new BadRequestError('Request validation failed', {
      cause: formatCause(errors.array()),
    })
  )
}

export { requestValidator }
