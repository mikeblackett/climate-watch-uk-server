export function variableSchema(knex) {
  return knex.schema.createTable('variables', function (table) {
    // HadGrid-UK variable code
    table.string('id').primary()
    // HadGrid-UK variable description
    table.string('description').notNullable()
    // HadGrid-UK variable plot label
    table.string('label').notNullable()
    // HadGrid-UK variable long name
    table.string('long_name').notNullable()
    // HadGrid-UK variable short name
    table.string('name').notNullable()
    // HadGrid-UK variable units
    table.string('units')
    // Time ID foreign key of first observation
    table.integer('start_time_id').unsigned().notNullable()
    table
      .foreign('start_time_id')
      .references('id')
      .inTable('times')
      .onDelete('CASCADE')
    // Time ID foreign key of last observation
    table.integer('end_time_id').unsigned().notNullable()
    table
      .foreign('end_time_id')
      .references('id')
      .inTable('times')
      .onDelete('CASCADE')
  })
}
