import Knex from 'knex'
import { Model } from 'objection'
import knexConfig from './knexfile.js'
import { Location } from './models/location.model.js'
import { Time } from './models/time.model.js'
import { Variable } from './models/variable.model.js'
import { Observation } from './models/observation.model.js'

const knex = Knex(knexConfig.development)
Model.knex(knex)

export { knex, Location, Time, Variable, Observation }
