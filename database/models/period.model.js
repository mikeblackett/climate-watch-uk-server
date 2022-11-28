import { BaseModel } from './base.model.js'
import { Time } from './time.model.js'
import { Location } from './location.model.js'
import { Variable } from './variable.model.js'

class Period extends BaseModel {
  static get tableName() {
    return 'periods'
  }

  static get relationMappings() {
    return {
      start_times: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Time,
        join: {
          from: 'periods.start_time_id',
          to: 'times.id',
        },
      },
      end_times: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Time,
        join: {
          from: 'periods.end_time_id',
          to: 'times.id',
        },
      },
    }
  }
}

export { Period }
