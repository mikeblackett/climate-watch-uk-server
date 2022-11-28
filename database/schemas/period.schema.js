export function periodSchema(knex) {
  return knex.schema.createTable('periods', function (table) {
    // ID composed of start_year+end_year i.e. 19912020
    table.integer('id').unsigned().primary()
    // Start time id
    table.integer('start_time_id').unsigned().notNullable()
    table
      .foreign('start_time_id')
      .references('id')
      .inTable('times')
      .onDelete('CASCADE')
    // End time id
    table.integer('end_time_id').unsigned().notNullable()
    table
      .foreign('end_time_id')
      .references('id')
      .inTable('times')
      .onDelete('CASCADE')
    // Name of the period in the form start-end e.g. 1991-2020
    table.string('name', 9)
    // Period type
    table.string('type')
  })
}
