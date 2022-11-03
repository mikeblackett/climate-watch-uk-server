/**
 * The Time model represents a 'dimension' table.
 * It contains attributes describing climate times.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Time'
const attributes = {
  year: {
    allowNull: false,
    type: DataTypes.INTEGER(4),
  },
  month: {
    allowNull: false,
    type: DataTypes.INTEGER(2),
    validate: {
      min: 1,
      max: 12,
    },
  },
}
class Time extends Model {}

/**
 * Defines the Time model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineTimeModel(sequelize) {
  Time.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Time.associate = () => {
    const { Climate } = sequelize.models
    Time.hasMany(Climate, {
      foreignKey: 'timeId',
    })
  }
  return Time
}

export { defineTimeModel }
