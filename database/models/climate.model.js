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
    return {
      average(query) {
        const { ref } = Climate
        return query
          .select([raw(`round(avg(?), 2) as value`, [ref('value')])])
          .groupBy([ref('variable_id'), ref('location_id')])
      },
      averageByYear(query) {
        const { ref } = Climate
        return query.modify('average').groupBy([ref('year')])
      },
      rankByYearAverage(query, order = 'desc') {
        const { ref } = Climate
        return query.select(
          raw(
            `dense_rank() over (partition by ?, ? order by avg(?) ${order}) as rank`,
            [ref('variable_id'), ref('location_id'), ref('value')]
          )
        )
      },
      averageByMonth(query) {
        const { ref } = Climate
        return query.modify('average').groupBy([ref('month')])
      },
      rankByMonth(query, order = 'desc') {
        const { ref } = Climate
        return query.select(
          raw(
            `dense_rank() over (partition by ?, ?, ? order by ? ${order}) as rank`,
            [ref('month'), ref('variable_id'), ref('location_id'), ref('value')]
          )
        )
      },
      averageBySeason(query) {
        const { ref } = Climate
        return query
          .modify('average')
          .groupBy([ref('season'), ref('season_year')])
      },
      rankBySeasonAverage(query, order = 'desc') {
        const { ref } = Climate
        return query.select(
          raw(
            `dense_rank() over (partition by ?, ?, ? order by avg(?) ${order}) as rank`,
            [
              ref('season'),
              ref('variable_id'),
              ref('location_id'),
              ref('value'),
            ]
          )
        )
      },
      filterByLocation(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('location_id'), conditions)
      },
      filterByYear(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('year'), conditions)
      },
      filterByYearRange(query, conditions) {
        const { ref } = Climate
        if (!Array.isArray(conditions)) {
          throw Error('`conditions` parameter should be an array with length 2')
        }
        if (conditions[0] && conditions[1]) {
          return query.whereBetween(ref('year'), conditions)
        }
        if (conditions[0] && !conditions[1]) {
          return query.where(ref('year'), '>=', conditions[0])
        }
        if (!conditions[0] && conditions[1]) {
          return query.where(ref('year'), '<=', conditions[1])
        }
        // Noop
        return query
      },
      filterBySeasonYearRange(query, conditions) {
        const { ref } = Climate
        if (!Array.isArray(conditions)) {
          throw Error('`conditions` parameter should be an array with length 2')
        }
        if (conditions[0] && conditions[1]) {
          return query.whereBetween(ref('season_year'), conditions)
        }
        if (conditions[0] && !conditions[1]) {
          return query.where(ref('season_year'), '>=', conditions[0])
        }
        if (!conditions[0] && conditions[1]) {
          return query.where(ref('season_year'), '<=', conditions[1])
        }
        // Noop
        return query
      },
      filterBySeason(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('season'), conditions)
      },
      filterBySeasonYear(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('season_year'), conditions)
      },
      filterByMonth(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('month'), conditions)
      },
      filterByVariable(query, conditions) {
        const { ref } = Climate
        const clause = Array.isArray(conditions) ? 'whereIn' : 'where'
        return query[clause](ref('variable_id'), conditions)
      },
    }
  }
}

export { Climate }
