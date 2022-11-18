/**
 * The Normal model represents a dimension table in a star schema.
 * It contains attributes describing the WMO Climatic Normals (standard climatological reference periods).
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Normal'
const attributes = {
  startYear: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  endYear: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}
class Normal extends Model {}

/**
 * Defines the Normal model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineNormalModel(sequelize) {
  Normal.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Normal.associate = () => {
    Normal.hasMany(sequelize.models.Anomaly, {
      foreignKey: 'normalId',
    })
  }
  return Normal
}

export { defineNormalModel }
