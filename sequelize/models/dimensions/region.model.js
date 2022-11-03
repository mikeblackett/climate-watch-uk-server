/**
 * The Region model represents a dimension table in a star schema.
 * It contains attributes describing the UK regions.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Region'
class Region extends Model {}
const attributes = {
  iso: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  geom: {
    // TODO Require geom when update db to Postgresql
    allowNull: true,
    type: DataTypes.GEOMETRY,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
}

/**
 * Defines the Region model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineRegionModel(sequelize) {
  Region.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Region.associate = () => {
    const { Climate } = sequelize.models
    Region.belongsTo(Region, { as: 'parent', foreignKey: 'parentIso' })
    Region.hasMany(Climate, {
      foreignKey: 'regionId',
    })
  }
  return Region
}

export { defineRegionModel }
