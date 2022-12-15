import validate from '../middlewares/json-validator.middleware.js'

const getSnapshot = validate({
  query: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
      },
      year: {
        type: 'string',
      },
      variable: {
        type: 'string',
      },
      month: {
        type: 'string',
      },
    },
    required: ['location', 'year'],
  },
})

export default { getSnapshot }
