import { Model } from 'objection'
import { Observation } from './observation.model.js'

class Variable extends Model {
  static get tableName() {
    return 'variables'
  }

  static get relationMappings() {
    return {
      observations: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'variables.id',
          to: 'observations.variable_id',
        },
      },
    }
  }
}

export { Variable }
