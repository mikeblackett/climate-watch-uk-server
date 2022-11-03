import sequelize from '../sequelize/index.js'
import { variables } from './helpers/variable.js'
import { months } from './helpers/month.js'
import { years } from './helpers/year.js'
import { regions } from './helpers/region.js'
import { units } from './helpers/unit.js'
import { generateTimes } from './helpers/time.js'
import { generateClimates } from './helpers/climate.js'

const times = generateTimes(years, months)
const climates = generateClimates(regions, times, variables)
async function reset() {
  try {
    await sequelize.sync({ force: true })
  } catch (error) {
    console.log('Failed to sync test database', error)
  }

  try {
    await sequelize.models.Region.bulkCreate(regions)
  } catch (error) {
    console.log('Failed to create Region model', error)
  }

  try {
    await sequelize.models.Unit.bulkCreate(units)
  } catch (error) {
    console.log('Failed to create Region model', error)
  }

  try {
    await sequelize.models.Time.bulkCreate(times)
  } catch (error) {
    console.log('Failed to create Time model', error)
  }

  try {
    await sequelize.models.Variable.bulkCreate(variables)
  } catch (error) {
    console.log('Failed to create Variable model', error)
  }

  try {
    await sequelize.models.Climate.bulkCreate(
      generateClimates(regions, times, variables)
    )
  } catch (error) {
    console.log('Failed to create Climate model', error)
  }
}

reset()
