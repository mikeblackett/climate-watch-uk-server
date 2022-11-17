/**
 * The Climate model represents a fact table in a star schema.
 * It contains the measured values of climatic variables indexed by the dimensions: Space, Time, Variable
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Climate'
const attributes = {
  value: {
    type: DataTypes.DECIMAL,
  },
  // Foreign key
  spaceId: {
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
    const { Space, Time, Variable } = sequelize.models
    Climate.belongsTo(Variable, {
      foreignKey: 'variableId',
    })
    Climate.belongsTo(Time, {
      foreignKey: 'timeId',
    })
    Climate.belongsTo(Space, {
      foreignKey: 'spaceId',
    })
  }
  return Climate
}

export { defineClimateModel }
