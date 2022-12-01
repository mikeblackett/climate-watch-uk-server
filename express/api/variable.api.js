import { raw } from 'objection'
import { Variable, Observation } from '../../database/index.js'
import { NotFoundError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

function getVariablesDefault() {
  return Variable.query()
    .alias('v')
    .select([
      'v.id as id',
      'v.description as description',
      'v.label as label',
      'v.long_name as long_name',
      'v.name as name',
      'v.units as units',
    ])
}

function getFirstYear() {
  return Observation.query()
    .alias('o')
    .select(
      'variable_id',
      raw(`extract(year from min(t.date))`).as('first_year')
    )
    .innerJoin('times as t', 'o.time_id', 't.id')
    .groupBy('variable_id')
}

async function getAllVariables(request, response, next) {
  try {
    const data = await getVariablesDefault()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getVariableById(request, response, next) {
  const { id } = request.params
  try {
    const data = await getVariablesDefault().for(id)
    if (data === undefined) {
      throw new NotFoundError(`variable`, {
        cause: { id: `Variable id '${id}' not found` },
      })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllVariables, getVariableById }
