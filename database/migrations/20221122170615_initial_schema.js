import { locationSchema } from '../schemas/location.schema.js'
import { variableSchema } from '../schemas/variable.schema.js'
import {
  climateSchema,
  seasonalClimateSchema,
  annualClimateSchema,
} from '../schemas/climate.schema.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return Promise.all([
    locationSchema(knex),
    variableSchema(knex),
    climateSchema(knex),
    seasonalClimateSchema(knex),
    annualClimateSchema(knex),
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
    .dropTableIfExists('climates')
    .dropTableIfExists('seasonal_climates')
    .dropTableIfExists('annual_climates')
}
