import validate from '../middlewares/json-validator.middleware.js'
import {
  location,
  month,
  season,
  variable,
  year,
} from './property.validators.js'

const query = {
  type: 'object',
  properties: {
    location,
    variable,
    year,
  },
  required: ['location', 'year'],
  additionalProperties: false,
}

const validateSnapshotMonth = validate({
  query: {
    ...query,
    properties: { ...query.properties, month },
    required: query.required.concat(['month']),
  },
})

const validateSnapshotSeason = validate({
  query: {
    ...query,
    properties: { ...query.properties, season },
    required: query.required.concat(['season']),
  },
})

const validateSnapshotYear = validate({
  query,
})

export { validateSnapshotMonth, validateSnapshotSeason, validateSnapshotYear }
