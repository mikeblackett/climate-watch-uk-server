/**
 * Custom error class which supports an HTTP status code as a property
 */
class ApiError extends Error {
  constructor(message, { cause, status }) {
    super(message, { cause })
    this.status = status
  }
}

export { ApiError }
