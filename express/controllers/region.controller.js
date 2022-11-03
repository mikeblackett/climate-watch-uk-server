import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'

const { Region } = sequelize.models

async function getAllRegionsApi(request, response, next) {
  try {
    const data = await Region.findAll({
      attributes: ['iso', 'name'],
    })
    response.json(data)
  } catch (error) {
    next(error)
  }
}

async function getRegionByIsoApi(request, response, next) {
  const { iso } = request.params
  try {
    const data = await Region.findByPk(iso, {
      attributes: { exclude: ['parentIso'] },
      include: {
        model: Region,
        as: 'parent',
      },
    })
    if (data === null) {
      throw new ApiError(`Invalid region ISO: ${iso}`, { status: 400 })
    }
    response.json(data)
  } catch (error) {
    next(error)
  }
}

export { getAllRegionsApi, getRegionByIsoApi }
