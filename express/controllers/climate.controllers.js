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

export { getSnapshot }
