import { BaseModel } from './base.model.js'
import { Observation } from './observation.model.js'

class Time extends BaseModel {
  static get tableName() {
    return 'times'
  }

  static get relationMappings() {
    return {
      observation: {
        relation: BaseModel.HasManyRelation,
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
