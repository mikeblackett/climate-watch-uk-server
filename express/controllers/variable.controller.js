import { Op } from 'sequelize'
import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

const { Variable, Unit } = sequelize.models

async function getAllVariablesApi(request, response, next) {
  try {
    const data = await Variable.findAll({
      raw: true,
    })
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getVariableByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Variable.findByPk(id, {
      raw: true,
    })
    if (data === null) {
      throw new ApiError(`Invalid variable id: ${id}`, { status: 400 })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllVariablesApi, getVariableByIdApi }
