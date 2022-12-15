import validate from '../middlewares/json-validator.middleware.js'

const idSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^gb(-[a-z]{3})?$',
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

export default { getAll, getById, getChildrenById }
