/**
 * The Variable model represents a dimension table in a star schema.
 * It contains attributes describing the climatic variables.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Unit'
const attributes = {
  symbol: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
}
class Unit extends Model {}

/**
 * Defines the Unit model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineUnitModel(sequelize) {
  Unit.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Unit.associate = () => {
    Unit.hasMany(sequelize.models.Variable, {
      foreignKey: 'unitId',
    })
  }
  return Unit
}

export { defineUnitModel }
