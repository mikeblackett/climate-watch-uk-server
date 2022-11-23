import { Model, snakeCaseMappers } from 'objection'

export class BaseModel extends Model {
  static columnNameMappers() {
    return snakeCaseMappers()
  }
}
