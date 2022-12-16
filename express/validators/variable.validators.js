import validate from '../middlewares/json-validator.middleware.js'
import { getAllIds } from '../services/variable.services.js'

const ids = await getAllIds()
const idEnum = ids.reduce((p, c) => {
  p.push(c.id)
  return p
}, [])

const getById = validate({
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        enum: idEnum,
      },
    },
    required: ['id'],
  },
})

export { getById, idEnum as variableIds }
