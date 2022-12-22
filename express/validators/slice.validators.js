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

const validateSliceMonth = validate({
  query: {
    ...query,
    properties: { ...query.properties, month },
  },
})

const validateSliceSeason = validate({
  query: {
    ...query,
    properties: { ...query.properties, season },
  },
})

const validateSliceYear = validate({
  query,
})

export { validateSliceMonth, validateSliceSeason, validateSliceYear }
