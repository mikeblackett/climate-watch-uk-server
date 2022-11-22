import { Model } from 'objection'
import { Observation } from './observation.model.js'

class Location extends Model {
  static get tableName() {
    return 'locations'
  }

  static get relationMappings() {
    // const Observation = require('./observation.model.js')
    // // (async () => {
    // //   const model = await import('./observation.model.js')
    // //   return model
    // // })()
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
