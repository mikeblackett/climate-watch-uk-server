import { Variable } from '../../database/index.js'
import { Payload } from '../utilities/payload.js'
const payload = new Payload()

async function getAllVariablesApi(request, response, next) {
  try {
    const data = await Variable.query()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getVariableByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Variable.query().findById(id)
    if (data === undefined) {
      return response.json(
        payload.fail({ id: `Unknown variable id ('${id}')` })
      )
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllVariablesApi, getVariableByIdApi }
