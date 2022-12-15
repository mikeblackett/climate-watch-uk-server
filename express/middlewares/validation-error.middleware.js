import { ValidationError } from 'express-json-validator-middleware'
import jsend from '../utilities/jsend.js'

function validationErrorMiddleware(error, request, response, next) {
  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (response.headersSent) {
    return next(error)
  }
  /**
   * If error is not a ValidationError,
   * delegate to the default Express error handler.
   */
  if (!(error instanceof ValidationError)) {
    return next(error)
  }
  response.json(jsend.fail(error.validationErrors))
}

export { validationErrorMiddleware }
