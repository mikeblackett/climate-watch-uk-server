import { Op } from 'sequelize'
import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'

const { Variable, Unit } = sequelize.models

async function getAllVariablesApi(request, response, next) {
  try {
    const data = await Variable.findAll({
      attributes: ['slug', 'name', 'nameLong'],
    })
    response.json(data)
  } catch (error) {
    next(error)
  }
}

async function getVariableBySlugApi(request, response, next) {
  const { slug } = request.params
  try {
    const data = await Variable.findByPk(slug, {
      attributes: {
        include: [[sequelize.col('Unit.symbol'), 'symbol']],
        exclude: ['unitId'],
      },
      include: { model: Unit, attributes: [], required: true },
      raw: true,
    })
    if (data === null) {
      throw new ApiError(`Invalid variable slug: ${slug}`, { status: 400 })
    }
    response.json(data)
  } catch (error) {
    next(error)
  }
}

export { getAllVariablesApi, getVariableBySlugApi }
