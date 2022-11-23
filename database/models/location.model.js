import { BaseModel } from './base.model.js'
import { Observation } from './observation.model.js'

class Location extends BaseModel {
  static get tableName() {
    return 'locations'
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: 'locations.id',
          to: 'locations.parent_id',
        },
      },
      observation: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'locations.id',
          to: 'observations.location_id',
        },
      },
    }
  }
}

export { Location }
