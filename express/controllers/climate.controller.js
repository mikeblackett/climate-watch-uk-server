// TODO create wrapper for JSend

import { Op, where } from 'sequelize'
import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

const { Climate, Time } = sequelize.models

async function getSnapshotMonthInYearApi(request, response, next) {
  const { month, region, variable, year } = request.query
  if (!region || !year || !month) {
    return next(
      new ApiError(
        'Calls to data/snapshot/month API must include region, month and year.',
        {
          status: 400,
        }
      )
    )
  }

  try {
    const data = await Climate.findAll({
      where: {
        regionId: region,
        ...(variable && { variableId: variable }),
      },
      attributes: [['variableId', 'variable'], 'value'],
      include: {
        model: Time,
        where: { year, month },
        attributes: [],
      },
      raw: true,
    })
    if (!data.length) {
      return response.json(payload.fail('No data found!'))
    }
    response.json(payload.success({ region, year, month, list: data }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotMonthInPeriodApi(request, response, next) {}
async function getSnapshotSeasonInYearApi(request, response, next) {}
async function getSnapshotSeasonInPeriodApi(request, response, next) {}

async function getSnapshotYearApi(request, response, next) {
  const { month, region, variable, year } = request.query
  if (!region || !year) {
    return next(
      new ApiError(
        'Calls to data/snapshot/year API must include region and year.',
        {
          status: 400,
        }
      )
    )
  }
  try {
    const data = await Climate.findAll({
      where: {
        regionId: region,
        ...(variable && { variableId: variable }),
      },
      attributes: [
        ['variableId', 'variable'],
        [sequelize.fn('AVG', sequelize.col('value')), 'value'],
      ],
      group: 'variableId',
      include: {
        model: Time,
        where: { year },
        attributes: [],
      },
      raw: true,
    })
    response.json({
      status: 'success',
      data: {
        region,
        year,
        list: data,
      },
    })
  } catch (error) {
    next(error)
  }
}

async function getSnapshotYearInPeriodApi(request, response, next) {}

async function getSliceMonthApi(request, response, next) {}
async function getSliceYearApi(request, response, next) {}
async function getSliceSeasonApi(request, response, next) {}

export { getSnapshotMonthInYearApi, getSnapshotYearApi }
