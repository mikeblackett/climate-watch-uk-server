import { BaseModel } from './base.model.js'
import { Observation } from './observation.model.js'
import { Period } from './period.model.js'

class Time extends BaseModel {
  static get tableName() {
    return 'times'
  }

  static get relationMappings() {
    return {
      observations: {
        relation: BaseModel.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'times.id',
          to: 'observations.time_id',
        },
      },
      period_start: {
        relation: BaseModel.HasManyRelation,
        modelClass: Period,
        join: {
          from: 'times.id',
          to: 'periods.start_time_id',
        },
      },
      period_end: {
        relation: BaseModel.HasManyRelation,
        modelClass: Period,
        join: {
          from: 'times.id',
          to: 'periods.end_time_id',
        },
      },
    }
  }
}

export { Time }
