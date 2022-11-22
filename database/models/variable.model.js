import { Model } from 'objection'

class Variable extends Model {
  static get tableName() {
    return 'variables'
  }

  static get relationMappings() {
    let Observation
    ;(async () => {
      Observation = await import('./observation.model.js')
    })()
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
