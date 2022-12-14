import { query } from 'express-validator'
import { requestValidator } from '../middlewares/request-validator.js'
import climateServices from '../services/climate.services.js'
import jsend from '../utilities/jsend.js'

function validate(method) {
  let validator
  switch (method) {
    case 'getSnapshot':
      validator = [
        query('year').exists().withMessage('Must specify a year'),
        query('month')
          .if(query('month').exists())
          .isInt({ min: 1, max: 12 })
          .withMessage('Month must be in range 1-12'),
      ]
      break
    default:
      return requestValidator
  }
  return [validator, requestValidator]
}

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

export default { getSnapshot, validate }
