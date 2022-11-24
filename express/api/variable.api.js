import { Variable } from '../../database/index.js'
import { NotFoundError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

async function getAllVariables(request, response, next) {
  try {
    const data = await Variable.query()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getVariableById(request, response, next) {
  const { id } = request.params
  try {
    const data = await Variable.query().findById(id)
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
