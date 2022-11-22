import { Variable } from '../../database/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

async function getAllVariablesApi(request, response, next) {
  try {
    const data = await Variable.query()
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getVariableByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Variable.query().findById(id)
    if (data === null) {
      throw new ApiError(`Invalid variable id: ${id}`, { status: 400 })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllVariablesApi, getVariableByIdApi }
