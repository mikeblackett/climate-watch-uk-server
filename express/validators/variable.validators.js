import validate from '../middlewares/json-validator.middleware.js'
import { variable } from './definitions.validators.js'

const validateVariableById = validate({
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        enum: variable.enum,
      },
    },
    required: ['id'],
  },
})

export { validateVariableById }
