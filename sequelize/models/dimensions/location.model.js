/**
 * The Location model represents a dimension table in a star schema.
 * It contains attributes describing spatial entities within the UK.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Location'
class Location extends Model {}
const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  // geom: {
  //   // TODO Require geom when update db to Postgresql
  //   allowNull: true,
  //   type: DataTypes.GEOMETRY,
  // },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  xCoord: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  yCoord: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
}

/**
 * Defines the Location model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineLocationModel(sequelize) {
  Location.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Location.associate = () => {
    const { Climate } = sequelize.models
    Location.belongsTo(Location, {
      as: 'parent',
      foreignKey: 'parentId',
    })
    Location.hasMany(Location, {
      foreignKey: 'parentId',
      as: 'children',
    })
    Location.hasMany(Climate, {
      foreignKey: 'locationId',
    })
  }
  return Location
}

export { defineLocationModel }
