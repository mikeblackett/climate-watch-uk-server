/**
 * The Time model represents a 'dimension' table.
 * It contains attributes describing climate times.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Time'
const attributes = {
  id: {
    type: DataTypes.INTEGER(6),
    primaryKey: true,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  year: {
    allowNull: false,
    type: DataTypes.INTEGER(4),
  },
  seasonYear: {
    allowNull: false,
    type: DataTypes.INTEGER(4),
  },
  monthNumber: {
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
    const { Climate, Variable } = sequelize.models
    Time.hasMany(Climate, {
      foreignKey: 'timeId',
    })
    Time.hasMany(Variable, {
      foreignKey: 'startTimeId',
    })
    Time.hasMany(Variable, {
      foreignKey: 'endTimeId',
    })
  }
  return Time
}

export { defineTimeModel }
