class ApiError extends Error {
  constructor(message, { cause, status }) {
    super(message, { cause })
    this.status = status
  }
}

export { ApiError }
