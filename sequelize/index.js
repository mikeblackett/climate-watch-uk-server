import process from 'node:process'
import { Sequelize } from 'sequelize'
import { defineClimateModel } from './models/facts/climate.model.js'
import { defineSpaceModel } from './models/dimensions/space.model.js'
import { defineVariableModel } from './models/dimensions/variable.model.js'
import { defineTimeModel } from './models/dimensions/time.model.js'
import config from './config/sequelize.config.js'
const env = process.env.NODE_ENV || 'development'

const sequelize = new Sequelize(config[env])

// #region ---------------------------------------------------------------Models
const models = {
  // Facts
  Climate: defineClimateModel(sequelize),
  // Dimensions
  Variable: defineVariableModel(sequelize),
  Space: defineSpaceModel(sequelize),
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
