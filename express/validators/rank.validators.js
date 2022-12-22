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
    year,
    start,
    end,
  },
  required: ['location', 'year'],
  additionalProperties: false,
}

const validateRankMonth = validate({
  query: {
    ...query,
    properties: { ...query.properties, month },
  },
})

const validateRankSeason = validate({
  query: {
    ...query,
    properties: { ...query.properties, season },
  },
})

const validateRankYear = validate({
  query,
})

export { validateRankMonth, validateRankSeason, validateRankYear }
