import { ApiError } from './base.error.js'

/**
 * @enum Types of client error HTTP status codes
 */
const statusCodes = {
  ClientError: 400,
  BadRequestError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  MethodNotAllowedError: 404,
}

/**
 * Error class representing client error responses
 * @extends ApiError
 */
class ClientError extends ApiError {
  constructor(message, { cause, statusCode = 400 } = {}) {
    super(message, { cause })
    this.statusCode = statusCodes[this.name] ?? statusCode
  }
}

/**
 * 400 Bad Request error
 * @extends ClientError
 */
class BadRequestError extends ClientError {}

/**
 * 404 Not Found error
 * @extends ApiError
 */
class NotFoundError extends ClientError {
  /** @inheritdoc */
  constructor(resource, { cause }) {
    super(`${resource} not found!`, { cause })
  }
}

export { ClientError, NotFoundError, BadRequestError }
