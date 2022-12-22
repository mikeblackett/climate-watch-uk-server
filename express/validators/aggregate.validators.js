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

const validateAggregateMonth = validate({
  query: {
    ...query,
    properties: { ...query.properties, month },
  },
})

const validateAggregateSeason = validate({
  query: {
    ...query,
    properties: { ...query.properties, season },
  },
})

const validateAggregateYear = validate({
  query,
})

export {
  validateAggregateMonth,
  validateAggregateSeason,
  validateAggregateYear,
}
