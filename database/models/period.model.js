import { BaseModel } from './base.model.js'

class Period extends BaseModel {
  static get tableName() {
    return 'periods'
  }
}

export { Period }
