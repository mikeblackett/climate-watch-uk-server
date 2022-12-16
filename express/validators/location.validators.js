import validate from '../middlewares/json-validator.middleware.js'
import { getAllIds } from '../services/locations.services.js'

const ids = await getAllIds()
const idEnum = ids.reduce((p, c) => {
  p.push(c.id)
  return p
}, [])

const idSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      enum: idEnum,
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

export { getAll, getById, getChildrenById, idEnum as locationIds }
