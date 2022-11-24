import { ApiError } from './base.error.js'

/**
 * @enum Types of server error HTTP status codes
 */
const statusCodes = {
  ServerError: 500,
  InternalServerError: 500,
  NotImplementedError: 501,
  BadGatewayError: 502,
  NetworkAuthenticationRequiredError: 511,
}

/**
 * Error class representing client error responses
 * @extends ApiError
 */
class ServerError extends ApiError {
  constructor(message, { cause, statusCode = 500 } = {}) {
    super(message, { cause })
    this.statusCode = statusCodes[this.name] ?? statusCode
  }
}

/**
 * 500 Internal Server error
 * @extends ServerError
 */
class InternalServerError extends ServerError {}

/**
 * 502 Bad Gateway error
 * @extends ServerError
 */
class BadGatewayError extends ServerError {}

export { ServerError, InternalServerError, BadGatewayError }
