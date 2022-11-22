import { Model } from 'objection'
import { Observation } from './observation.model.js'

class Time extends Model {
  static get tableName() {
    return 'times'
  }

  static get relationMappings() {
    return {
      observation: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'times.id',
          to: 'observations.time_id',
        },
      },
    }
  }
}

export { Time }
