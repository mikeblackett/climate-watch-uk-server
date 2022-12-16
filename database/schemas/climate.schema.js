async function climateSchema(knex) {
  return knex.schema.createTable('climates', function (table) {
    table.increments('id')
    table.decimal('value')
    table.smallint('year')
    table.smallint('season_year')
    table.string('season')
    table.tinyint('month')
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

export { climateSchema }
