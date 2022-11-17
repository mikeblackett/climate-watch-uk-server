// TODO create wrapper for JSend

import { Op, where } from 'sequelize'
import sequelize from '../../sequelize/index.js'
import { ApiError } from '../utilities/error.js'
import { payload } from '../utilities/payload.js'

const { Climate, Time } = sequelize.models

async function getSnapshotMonthInYearApi(request, response, next) {
  const { month, location, variable, year } = request.query
  if (!location || !year || !month) {
    return next(
      new ApiError(
        'Calls to data/snapshot/month API must include location, month and year.',
        {
          status: 400,
        }
      )
    )
  }
  try {
    const data = await Climate.findAll({
      where: {
        locationId: location,
        ...(variable && { variableId: variable }),
      },
      attributes: [['variableId', 'variable'], 'value'],
      include: {
        model: Time,
        where: { year, monthNumber: month },
        attributes: [],
      },
      raw: true,
    })
    if (!data.length) {
      return response.json(payload.fail('No data found!'))
    }
    response.json(payload.success({ location, year, month, list: data }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotMonthInPeriodApi(request, response, next) {}
async function getSnapshotSeasonInYearApi(request, response, next) {}
async function getSnapshotSeasonInPeriodApi(request, response, next) {}

async function getSnapshotYearApi(request, response, next) {
  const { month, location, variable, year } = request.query
  if (!location || !year) {
    return next(
      new ApiError(
        'Calls to data/snapshot/year API must include location and year.',
        {
          status: 400,
        }
      )
    )
  }
  try {
    const data = await Climate.findAll({
      where: {
        locationId: location,
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
    response.json(payload.success({ location, year, month, list: data }))
  } catch (error) {
    next(error)
  }
}

async function getSnapshotYearInPeriodApi(request, response, next) {}

async function getSliceMonthApi(request, response, next) {}
async function getSliceYearApi(request, response, next) {}
async function getSliceSeasonApi(request, response, next) {}

export { getSnapshotMonthInYearApi, getSnapshotYearApi }
