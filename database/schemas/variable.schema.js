export async function variableSchema(knex) {
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
  })
}
