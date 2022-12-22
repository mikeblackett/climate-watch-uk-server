import validate from '../middlewares/json-validator.middleware.js'
import {
  location,
  month,
  season,
  variable,
  year,
} from './definitions.validators.js'

const start = { ...year }
const end = { ...year }

const query = {
  type: 'object',
  properties: {
    location,
    variable,
    start,
    end,
  },
  required: ['location'],
  additionalProperties: false,
}

const validateExtremeMonth = validate({
  query: {
    ...query,
    properties: { ...query.properties, month },
  },
})

const validateExtremeSeason = validate({
  query: {
    ...query,
    properties: { ...query.properties, season },
  },
})

const validateExtremeYear = validate({
  query,
})

export { validateExtremeMonth, validateExtremeSeason, validateExtremeYear }
