/**
 * @module jsend JSend-compliant server responses
 * @see {@link https://github.com/omniti-labs/jsend}
 */

/**
 * JSend response types
 * @readonly
 * @enum {string}
 */
const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
}

/**
 * Converts an HTTP status code to a JSend response type
 * @param {number} code An HTTP status code
 * @returns {string} A JSend response type
 */
function getStatus(code) {
  if (code >= 500) {
    return status.ERROR
  }
  if (code >= 400) {
    return status.FAIL
  }
  return status.SUCCESS
}

function success(data) {
  return {
    status: status.SUCCESS,
    data,
  }
}

function fail(data) {
  return {
    status: status.FAIL,
    data,
  }
}

function error(message, code) {
  return {
    status: status.ERROR,
    code,
    message,
  }
}

export default { success, fail, error, getStatus }
