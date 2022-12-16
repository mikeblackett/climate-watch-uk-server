import * as climateServices from '../services/climate.services.js'
import jsend from '../utilities/jsend.js'

async function getSnapshot(request, response, next) {
  try {
    const { location, variable, year, month } = request.query
    let data
    if (month) {
      data = await climateServices.monthAverage(location, variable, year, month)
    } else {
      data = await climateServices.yearAverage(location, variable, year)
    }
    response.json(jsend.success(data))
  } catch (error) {
    next(error)
  }
}

async function getMaxMonth(request, response, next) {
  try {
    const { location, variable, month, from, to } = request.query
    const data = await climateServices.maxMonth(
      location,
      variable,
      month,
      from,
      to
    )
    response.json(jsend.success(data))
  } catch (error) {}
}

export { getSnapshot, getMaxMonth }
