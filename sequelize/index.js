import process from 'node:process'
import { Sequelize } from 'sequelize'
import { defineClimateModel } from './models/facts/climate.model.js'
import { defineRegionModel } from './models/dimensions/region.model.js'
import { defineVariableModel } from './models/dimensions/variable.model.js'
import { defineTimeModel } from './models/dimensions/time.model.js'

const env = process.env.NODE_ENV || 'development'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './test-database/test-db.sqlite',
  logQueryParameters: true,
  benchmark: true,
})

// #region ---------------------------------------------------------------Models
const models = {
  // Facts
  Climate: defineClimateModel(sequelize),
  // Dimensions
  Variable: defineVariableModel(sequelize),
  Region: defineRegionModel(sequelize),
  Time: defineTimeModel(sequelize),
}
// #endregion

// #region ---------------------------------------------------------Associations
Object.values(models).forEach((model) => {
  if (!model.associate) return
  model.associate()
})
// #endregion

export default sequelize
