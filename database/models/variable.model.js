import { BaseModel } from './base.model.js'
import { Climate } from './annual-climate.model.js'
import { SeasonalClimate } from './seasonal-climate.model.js'

class Variable extends BaseModel {
  static get tableName() {
    return 'variables'
  }

  static get relationMappings() {
    return {
      climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: Climate,
        join: {
          from: 'variables.id',
          to: 'climates.location_id',
        },
      },
      seasonal_climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: SeasonalClimate,
        join: {
          from: 'variables.id',
          to: 'seasonal_climates.location_id',
        },
      },
      annual_climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: AnnualClimate,
        join: {
          from: 'variables.id',
          to: 'annual_climates.location_id',
        },
      },
    }
  }
}

export { Variable }
