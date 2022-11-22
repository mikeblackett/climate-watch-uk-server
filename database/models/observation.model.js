import { Model } from 'objection'
import { Time } from './time.model.js'
import { Location } from './location.model.js'
import { Variable } from './variable.model.js'

class Observation extends Model {
  static get tableName() {
    return 'observations'
  }

  static get relationMappings() {
    return {
      times: {
        relation: Model.BelongsToOneRelation,
        modelClass: Time,
        join: {
          from: 'observations.timeId',
          to: 'times.id',
        },
      },
      locations: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: 'observations.locationId',
          to: 'locations.id',
        },
      },
      variables: {
        relation: Model.BelongsToOneRelation,
        modelClass: Variable,
        join: {
          from: 'observations.variableId',
          to: 'variables.id',
        },
      },
    }
  }
}

export { Observation }
