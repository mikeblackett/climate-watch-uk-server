import jsend from '../utilities/jsend.js'

function errorMiddleware(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }
  response.json(jsend.error(error.message, response.statusCode))
}

export { errorMiddleware }
