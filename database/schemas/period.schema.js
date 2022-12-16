async function periodSchema(knex) {
  return knex.schema.createTable('periods', function (table) {
    table.integer('id').primary()
    table.smallint('year_start')
    table.smallint('year_end')
    table.string('name')
    table.string('type')
  })
}

export { periodSchema }
