import { BaseModel } from './base.model.js'
import { Time } from './time.model.js'
import { Location } from './location.model.js'
import { Variable } from './variable.model.js'

class Observation extends BaseModel {
  static get tableName() {
    return 'observations'
  }

  static get relationMappings() {
    return {
      times: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Time,
        join: {
          from: 'observations.time_id',
          to: 'times.id',
        },
      },
      locations: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: 'observations.location_id',
          to: 'locations.id',
        },
      },
      variables: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Variable,
        join: {
          from: 'observations.variable_id',
          to: 'variables.id',
        },
      },
    }
  }
}

export { Observation }
