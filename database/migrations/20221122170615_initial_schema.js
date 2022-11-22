import { locationSchema } from '../schemas/location.schema.js'
import { timeSchema } from '../schemas/time.schema.js'
import { variableSchema } from '../schemas/variable.schema.js'
import { observationSchema } from '../schemas/observation.schema.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return Promise.all([
    locationSchema(knex),
    timeSchema(knex),
    variableSchema(knex),
    observationSchema(knex),
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists('locations')
    .dropTableIfExists('times')
    .dropTableIfExists('variables')
    .dropTableIfExists('observations')
}