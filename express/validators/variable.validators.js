import validate from '../middlewares/json-validator.middleware.js'
import { location } from './definitions.validators.js'

const getById = validate({
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        enum: location.enum,
      },
    },
    required: ['id'],
  },
})

export { getById }
