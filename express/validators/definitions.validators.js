import { getAllIds as getVariableIds } from '../services/meta/variable.services.js'
import { getAllIds as getLocationIds } from '../services/meta/location.services.js'

const locationIds = await getLocationIds()
const locationEnum = locationIds.reduce((p, c) => {
  p.push(c.id)
  return p
}, [])
const variableIds = await getVariableIds()
const variableEnum = variableIds.reduce((p, c) => {
  p.push(c.id)
  return p
}, [])

const location = {
  type: 'string',
  enum: locationEnum,
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
  enum: variableEnum,
}
const month = {
  type: 'string',
  pattern: '^([1-9]|1[0-2])$',
}

export { location, year, season, variable, month }
