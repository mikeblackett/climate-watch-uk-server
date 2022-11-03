/**
 * The Climate model represents a fact table in a star schema.
 * It contains the measured values of climatic variables indexed by the dimensions: Region, Time, Variable
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Climate'
const attributes = {
  value: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  // Foreign key
  regionId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  // Foreign key
  timeId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  // Foreign key
  variableId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
}
class Climate extends Model {}

/**
 * Defines the Climate model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineClimateModel(sequelize) {
  Climate.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Climate.associate = () => {
    const { Region, Time, Variable } = sequelize.models
    Climate.belongsTo(Variable, {
      foreignKey: 'variableId',
    })
    Climate.belongsTo(Time, {
      foreignKey: 'timeId',
    })
    Climate.belongsTo(Region, {
      foreignKey: 'regionId',
    })
  }
  return Climate
}

export { defineClimateModel }
