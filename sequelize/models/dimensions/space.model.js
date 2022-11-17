/**
 * The Space model represents a dimension table in a star schema.
 * It contains attributes describing spatial entities within the UK.
 * The `id` attribute is used as a foreign key to index the Climate model
 */
import { DataTypes, Model } from 'sequelize'

const modelName = 'Space'
class Space extends Model {}
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
 * Defines the Space model.
 * @param {object} sequelize A Sequelize connection object
 * @returns {object} The Sequelize model
 */
function defineSpaceModel(sequelize) {
  Space.init(attributes, {
    sequelize,
    modelName,
    timestamps: false,
  })
  Space.associate = () => {
    const { Climate } = sequelize.models
    Space.belongsTo(Space, {
      as: 'parent',
      foreignKey: 'parentId',
    })
    Space.hasMany(Space, {
      foreignKey: 'parentId',
      as: 'children',
    })
    Space.hasMany(Climate, {
      foreignKey: 'spaceId',
    })
  }
  return Space
}

export { defineSpaceModel }
