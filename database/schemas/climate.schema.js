async function climateSchema(knex) {
  return knex.schema.createTable('climates', function (table) {
    table.increments('id')
    table.decimal('value')
    table.smallint('year')
    table.smallint('month')
    table.string('location_id').notNullable()
    table
      .foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
    table.string('variable_id').notNullable()
    table
      .foreign('variable_id')
      .references('id')
      .inTable('variables')
      .onDelete('CASCADE')
  })
}

async function seasonalClimateSchema(knex) {
  return knex.schema
    .createTableLike('seasonal_climates', 'climates', function (table) {
      table.string('season')
    })
    .alterTable('seasonal_climates', function (table) {
      table.dropColumn('month')
    })
}

async function annualClimateSchema(knex) {
  return knex.schema
    .createTableLike('annual_climates', 'climates')
    .alterTable('annual_climates', function (table) {
      table.dropColumn('month')
    })
}

export { climateSchema, annualClimateSchema, seasonalClimateSchema }
