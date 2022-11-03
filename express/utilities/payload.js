const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
}

// getStatus(code) {
//   if (code >= 500) {
//     return status.ERROR
//   }
//   if (code >= 400) {
//     return status.FAIL
//   }
//   return status.SUCCESS
// }

const payload = {
  success(data = {}) {
    return {
      status: status.SUCCESS,
      data,
    }
  },

  fail(message = '') {
    return {
      status: status.FAIL,
      data: {
        message,
      },
    }
  },

  error(message = '') {
    return {
      status: status.ERROR,
      message,
    }
  },
}

export { payload }
