import { Op } from 'sequelize'
import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'

const { Time } = sequelize.models

async function getAllTimesApi(request, response, next) {
  try {
    const data = await Time.findAll({ attributes: { exclude: ['id'] } })
    response.json(data)
  } catch (error) {
    next(error)
  }
}

async function getTimesByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Time.findByPk(id)
    if (data === null) {
      throw new ApiError(`Invalid time ID: ${id}`, { status: 400 })
    }
    response.json(data)
  } catch (error) {
    next(error)
  }
}

export { getAllTimesApi, getTimesByIdApi }
