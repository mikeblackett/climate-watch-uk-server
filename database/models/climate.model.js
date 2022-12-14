import { raw } from 'objection'
import { BaseModel } from './base.model.js'
import { Location } from './location.model.js'
import { Variable } from './variable.model.js'

class Climate extends BaseModel {
  static get tableName() {
    return 'climates'
  }

  static get relationMappings() {
    return {
      locations: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: `${this.tableName}.location_id`,
          to: 'locations.id',
        },
      },
      variables: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Variable,
        join: {
          from: `${this.tableName}.variable_id`,
          to: 'variables.id',
        },
      },
    }
  }

  static get modifiers() {
    const Model = this
    return {
      getYears(query, rank = false) {
        const { ref } = Climate
        query
          .select([
            ref('variable_id'),
            ref('location_id'),
            ref('year'),
            raw(`round(avg(?), 2) as value`, [ref('value')]),
          ])
          .groupBy([ref('year'), ref('variable_id'), ref('location_id')])
        if (rank) {
          query.select(
            raw(
              'dense_rank() over (partition by ?, ? order by avg(?) desc) as rank',
              [ref('variable_id'), ref('location_id'), ref('value')]
            )
          )
        }
        return query
      },
      getMonths(query, rank = false) {
        const { ref } = Climate
        query.select(
          ref('variable_id'),
          ref('location_id'),
          ref('year'),
          ref('month'),
          ref('value')
        )
        if (rank) {
          query.select(
            raw(
              `dense_rank() over (partition by ?, ?, ? order by ? desc) as rank`,
              [
                ref('month'),
                ref('variable_id'),
                ref('location_id'),
                ref('value'),
              ]
            )
          )
        }
      },
      filterByLocation(query, conditions) {
        const { ref } = Model
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('location_id'), conditions)
      },
      filterByYear(query, conditions) {
        const { ref } = Model
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('year'), conditions)
      },
      filterByMonth(query, conditions) {
        const { ref } = Model
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('month'), conditions)
      },
      filterByVariable(query, conditions) {
        const { ref } = Model
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('variable_id'), conditions)
      },
    }
  }
}

export { Climate }
