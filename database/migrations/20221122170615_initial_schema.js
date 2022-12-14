import { locationSchema } from '../schemas/location.schema.js'
import { variableSchema } from '../schemas/variable.schema.js'
import { periodSchema } from '../schemas/period.schema.js'
import { climateSchema } from '../schemas/climate.schema.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return Promise.all([
    locationSchema(knex),
    variableSchema(knex),
    periodSchema(knex),
    climateSchema(knex),
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists('locations')
    .dropTableIfExists('variables')
    .dropTableIfExists('periods')
    .dropTableIfExists('climates')
}
