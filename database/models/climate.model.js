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
}

class SeasonalClimate extends Climate {
  static get tableName() {
    return 'seasonal_climates'
  }
}

class AnnualClimate extends Climate {
  static get tableName() {
    return 'annual_climates'
  }
}

export { Climate, SeasonalClimate, AnnualClimate }
