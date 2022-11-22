import { Location } from '../../database/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

async function getAllLocationsApi(request, response, next) {
  const { type } = request.query
  const query = Location.query()
  try {
    let data
    if (type) {
      data = await query.where('type', type)
    } else {
      data = await query
    }
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
    const data = await Location.query().findById(id)
    if (data === null) {
      throw new ApiError(`Invalid location id: '${id}'`, { status: 400 })
    }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

async function getLocationChildrenByIdApi(request, response, next) {
  const { id } = request.params
  try {
    const data = await Location.relatedQuery('children').for(id)
    // if (parent === null) {
    //   throw new ApiError(`Invalid spatial id: '${id}'`, { status: 400 })
    // }
    // const children = await parent.getChildren()
    // const data = {
    //   ...parent.get(),
    //   list: children,
    // }
    response.json(payload.success(data))
  } catch (error) {
    next(error)
  }
}

export { getAllLocationsApi, getLocationByIdApi, getLocationChildrenByIdApi }
