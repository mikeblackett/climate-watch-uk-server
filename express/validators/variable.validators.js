import validate from '../middlewares/json-validator.middleware.js'

const getById = validate({
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        minLength: 3,
      },
    },
    required: ['id'],
  },
})

export default { getById }
