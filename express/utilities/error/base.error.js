/**
 * @enum Client error HTTP status codes
 */
const clientErrorStatusCodes = {
  ClientError: 400,
  BadRequestError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  MethodNotAllowedError: 404,
}
/**
 * @enum Server error HTTP status codes
 */
const serverErrorStatusCodes = {
  ServerError: 500,
  NotImplementedError: 501,
  NetworkAuthenticationRequiredError: 511,
}
/**
 * @enum HTTP status codes
 */
const statusCodes = {
  ...clientErrorStatusCodes,
  ...serverErrorStatusCodes,
}

/**
 * API Error object with associated HTTP status code
 */
class ApiError extends Error {
  /**
   * Returns a new ApiError instance
   * @param {string} message A human-readable description of the error.
   * @param {object} options
   * @param {any} options.cause A property indicating the specific cause of the error.
   * @param {number} options.statusCode The HTTP response status code associated with the error.
   */
  constructor(message, { cause, statusCode }) {
    super(message, { cause })
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}

/**
 * @module ApiError
 */
export { ApiError }
