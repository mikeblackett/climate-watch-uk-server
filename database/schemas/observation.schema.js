export async function observationSchema(knex) {
  return knex.schema.createTable('observations', function (table) {
    // Auto-incrementing primary key
    table.increments('id')
    // The observed value
    table.decimal('value')
    // Time ID foreign key
    table.integer('time_id').unsigned().notNullable()
    table
      .foreign('time_id')
      .references('id')
      .inTable('times')
      .onDelete('CASCADE')
    // Location ID foreign key
    table.string('location_id').notNullable()
    table
      .foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
    // Variable ID foreign key
    table.string('variable_id').notNullable()
    table
      .foreign('variable_id')
      .references('id')
      .inTable('variables')
      .onDelete('CASCADE')
  })
}
