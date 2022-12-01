import { Time } from '../../database/index.js'
import { NotFoundError } from '../error/client.error.js'
import { Payload } from './payload.js'

const payload = new Payload()

async function getAllTimes(request, response, next) {
  try {
    const data = await Time.query()
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getTimesById(request, response, next) {
  const { id } = request.params
  try {
    const data = await Time.query().findById(id)
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

async function getAllYears(request, response, next) {
  try {
    const data = await Time.query().distinct('year').orderBy('year', 'desc')
    const years = data.map((item) => item.year)
    response.json(payload.success({ list: years }))
  } catch (error) {
    next(error)
  }
}

export { getAllTimes, getTimesById, getAllYears }
