/**
 * The Variable model represents a dimension table in a star schema.
 * It contains attributes describing the climatic variables.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Variable'
const attributes = {
  slug: {
    primaryKey: true,
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
  nameLong: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  unitId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  startYear: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
    const { Climate, Unit } = sequelize.models
    Variable.belongsTo(Unit, {
      foreignKey: 'unitId',
    })
    Variable.hasMany(Climate, {
      foreignKey: 'variableId',
    })
  }
  return Variable
}

export { defineVariableModel }
