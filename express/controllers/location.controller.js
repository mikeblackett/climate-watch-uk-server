import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

const { Location } = sequelize.models

async function getAllLocationsApi(request, response, next) {
  try {
    const data = await Location.findAll({
      raw: true,
    })
    if (!data.length) {
      response.json(payload.fail('No data found!'))
    }
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getAllCountriesApi(request, response, next) {
  try {
    const data = await Location.findAll({
      where: {
        type: 'country',
      },
      raw: true,
    })
    if (!data.length) {
      response.json(payload.fail('No data found!'))
    }
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getAllRegionsApi(request, response, next) {
  try {
    const data = await Location.findAll({
      where: {
        type: 'region',
      },
      raw: true,
    })
    if (!data.length) {
      response.json(payload.fail('No data found!'))
    }
    response.json(payload.success({ list: data }))
  } catch (error) {
    next(error)
  }
}

async function getLocationByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.findByPk(id, {
      // attributes: { exclude: ['parentId'] },
      // include: {
      //   model: Location,
      //   as: 'parent',
      // },
    })
    if (data === null) {
      throw new ApiError(`Invalid spatial id: '${id}'`, { status: 400 })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getLocationChildrenApi(request, response, next) {
  const { id } = request.params
  try {
    const parent = await Location.findByPk(id)
    if (parent === null) {
      throw new ApiError(`Invalid spatial id: '${id}'`, { status: 400 })
    }
    const children = await parent.getChildren()
    const data = {
      ...parent.get(),
      list: children,
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export {
  getAllLocationsApi,
  getAllCountriesApi,
  getAllRegionsApi,
  getLocationByIdApi,
  getLocationChildrenApi,
}
