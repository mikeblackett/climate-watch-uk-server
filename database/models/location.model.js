import { BaseModel } from './base.model.js'
import { Climate, SeasonalClimate, AnnualClimate } from './climate.model.js'

class Location extends BaseModel {
  static get tableName() {
    return 'locations'
  }

  static get relationMappings() {
    return {
      children: {
        relation: BaseModel.HasManyRelation,
        modelClass: Location,
        join: {
          from: 'locations.id',
          to: 'locations.parent_id',
        },
      },
      climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: Climate,
        join: {
          from: 'locations.id',
          to: 'climates.location_id',
        },
      },
      seasonal_climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: SeasonalClimate,
        join: {
          from: 'locations.id',
          to: 'seasonal_climates.location_id',
        },
      },
      annual_climates: {
        relation: BaseModel.HasManyRelation,
        modelClass: AnnualClimate,
        join: {
          from: 'locations.id',
          to: 'annual_climates.location_id',
        },
      },
    }
  }
}

export { Location }
