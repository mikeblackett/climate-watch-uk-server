import jsend from '../utilities/jsend.js'

function errorMiddleware(error, request, response, next) {
  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (response.headersSent) {
    return next(error)
  }
  response.json(jsend.error(error.message, response.statusCode))
}

export { errorMiddleware }
