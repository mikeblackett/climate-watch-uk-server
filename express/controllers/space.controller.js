import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

const { Space } = sequelize.models

async function getAllSpacesApi(request, response, next) {
  try {
    const data = await Space.findAll({
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
    const data = await Space.findAll({
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
    const data = await Space.findAll({
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

async function getSpaceByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Space.findByPk(id, {
      // attributes: { exclude: ['parentId'] },
      // include: {
      //   model: Space,
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

async function getSpaceChildrenApi(request, response, next) {
  const { id } = request.params
  try {
    const parent = await Space.findByPk(id)
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
  getAllSpacesApi,
  getAllCountriesApi,
  getAllRegionsApi,
  getSpaceByIdApi,
  getSpaceChildrenApi,
}
