import { Period } from '../../database/index.js'
import { NotFoundError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

async function getAllPeriods(request, response, next) {
  try {
    const data = await Period.query()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getPeriodById(request, response, next) {
  const { id } = request.params
  try {
    const data = await Variable.query().findById(id)
    if (data === undefined) {
      throw new NotFoundError(`period`, {
        cause: { id: `Period id '${id}' not found` },
      })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllPeriods, getPeriodById }
