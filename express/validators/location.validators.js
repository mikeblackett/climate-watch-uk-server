import validate from '../middlewares/json-validator.middleware.js'
import { location } from './definitions.validators.js'

const idSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      enum: location.enum,
    },
  },
  required: ['id'],
}

const validateAllLocations = validate({
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

const validateLocationById = validate({
  params: idSchema,
})

const validateLocationChildrenById = validate({
  params: idSchema,
})

export {
  validateAllLocations,
  validateLocationById,
  validateLocationChildrenById,
}
