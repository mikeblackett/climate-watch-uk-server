import { BaseModel } from './base.model.js'
import { Climate } from './climate.model.js'

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
    }
  }
}

export { Variable }
