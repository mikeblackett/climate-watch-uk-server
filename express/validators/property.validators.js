import { variableIds } from './variable.validators.js'
import { locationIds } from './location.validators.js'

const location = {
  type: 'string',
  enum: locationIds,
}
const year = {
  type: 'string',
  pattern: '^(183[6-9]|18[4-9][0-9]|19[0-9][0-9]|20[0-1][0-9]|202[0-1])$',
}
const season = {
  type: 'string',
  enum: ['win', 'spr', 'sum', 'aut'],
}
const variable = {
  type: 'string',
  enum: variableIds,
}
const month = {
  type: 'string',
  pattern: '^([1-9]|1[0-2])$',
}

export { location, year, season, variable, month }
