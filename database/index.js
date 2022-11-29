import Knex from 'knex'
import { Model } from 'objection'
import pg from 'pg'
import knexConfig from './knexfile.js'
import { Location } from './models/location.model.js'
import { Time } from './models/time.model.js'
import { Variable } from './models/variable.model.js'
import { Observation } from './models/observation.model.js'
import { Period } from './models/period.model.js'

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
  return parseFloat(value)
})

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value)
})

const knex = Knex(knexConfig.development)
Model.knex(knex)

export { knex, Location, Time, Variable, Observation, Period }
