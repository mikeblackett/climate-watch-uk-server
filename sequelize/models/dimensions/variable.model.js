/**
 * The Variable model represents a dimension table in a star schema.
 * It contains attributes describing the climatic variables.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Variable'
const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  label: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  longName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  units: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}
class Variable extends Model {}

/**
 * Defines the Variable model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineVariableModel(sequelize) {
  Variable.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Variable.associate = () => {
    const { Climate, Time } = sequelize.models
    Variable.hasMany(Climate, {
      foreignKey: 'variableId',
    })
    Variable.hasOne(Time, {
      foreignKey: 'startTimeId',
    })
    Variable.hasOne(Time, {
      foreignKey: 'endTimeId',
    })
  }
  return Variable
}

export { defineVariableModel }
