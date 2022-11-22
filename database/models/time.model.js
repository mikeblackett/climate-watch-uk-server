import { Model } from 'objection'

class Time extends Model {
  static get tableName() {
    return 'times'
  }

  static get relationMappings() {
    let Observation
    ;(async () => {
      Observation = await import('./observation.model.js')
    })()
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
