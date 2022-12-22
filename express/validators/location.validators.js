import validate from '../middlewares/json-validator.middleware.js'
import { variable } from './definitions.validators.js'

const idSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      enum: variable.enum,
    },
  },
  required: ['id'],
}

const getAll = validate({
  query: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['country', 'region'],
      },
    },
  },
})

const getById = validate({
  params: idSchema,
})

const getChildrenById = validate({
  params: idSchema,
})

export { getAll, getById, getChildrenById }
