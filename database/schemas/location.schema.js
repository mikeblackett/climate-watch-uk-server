export async function locationSchema(knex) {
  return knex.schema.createTable('locations', function (table) {
    // Pseudo ISO 1366 country code
    table.string('id', 6).primary()
    // Self-referencing parent id
    table.string('parent_id', 6).nullable()
    table
      .foreign('parent_id')
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
    // Longitudinal center
    table.decimal('x_coord')
    // Latitudinal center
    table.decimal('y_coord')
    // Common name
    table.string('name').notNullable()
    // Country/region
    table.string('type')
  })
}
