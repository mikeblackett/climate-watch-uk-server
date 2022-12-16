import validate from '../middlewares/json-validator.middleware.js'
import { getAllIds } from '../services/variable.services.js'

const variables = await getAllIds()
const variableEnum = variables.reduce((p, c) => {
  p.push(c.id)
  return p
}, [])

const getSnapshot = validate({
  query: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
      },
      year: {
        type: 'string',
        pattern: '^(183[6-9]|18[4-9][0-9]|19[0-9][0-9]|20[0-1][0-9]|202[0-1])$',
      },
      variable: {
        type: 'string',
        enum: variableEnum,
      },
      month: {
        type: 'string',
        pattern: '^([1-9]|1[0-2]{1})$',
      },
    },
    required: ['location', 'year'],
  },
})

export default { getSnapshot }
